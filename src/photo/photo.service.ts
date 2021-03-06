import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityManager,
  Repository,
  Transaction,
  TransactionManager,
} from 'typeorm';
import { Folder } from '../folder/entities/folder.entity';
import { PointLog } from '../point/entities/point-log.entity';
import { Point, PointType } from '../point/entities/point.entity';
import { User } from '../user/entities/user.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { Photo } from './entities/photo.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class PhotoService {
  // 사진 업로드로 차감될 포인트 수량
  private static readonly PHOTO_POINT = -100;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,

    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  // 트랜잭션 격리 수준
  // READ UNCOMMITTED: 트랜잭션내에서 커밋하지 않은 데이터에 다른 트랜잭션의 접근이 가능
  // READ COMMITTED: 트랜잭션내에서 커밋된 데이터만 다른 트랜잭션이 읽는 것을 허용
  // REPEATABLE READ: 트랜잭션 내에서 한 번 조회한 데이터를 반복해서 조회해도 결과는 동일
  // SERIALIZABLE: 가장 엄격한 격리 수준으로 완벽한 읽기 일관성 모드 제공
  @Transaction({ isolation: 'READ COMMITTED' })
  async create(
    userId: number,
    folderId: number,
    photos: CreatePhotoDto[],
    tags: CreateTagDto[],
    @TransactionManager() manager?: EntityManager,
  ) {
    if (!manager) {
      throw new InternalServerErrorException(
        '트랜잭션 생성 중 오류가 발생 하였습니다.',
      );
    }

    const user = await manager.findOne(User, userId);
    if (!user) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    const folder = await manager.findOne(Folder, folderId);
    if (!folder) {
      throw new NotFoundException('해당 폴더를 찾을 수 없습니다.');
    }

    // 현재 포인트 합계를 가져온다
    const { currentPoint } = await manager
      .createQueryBuilder(Point, 'point')
      .select('SUM(point.amount)', 'currentPoint')
      .where('point.userId = :userId', { userId })
      .getRawOne();

    // 사진을 업로드 하는데 100포인트가 필요하며, 사진 갯수에 따라 포인트 필요량을 계산한다
    const requiredPoint = photos.length * -PhotoService.PHOTO_POINT;

    // 포인트가 충분히 있으면 다음 업로드 로직으로 넘어간다
    if (+currentPoint < requiredPoint) {
      throw new BadRequestException(
        `사진을 업로드 하기 위한 포인트가 부족합니다. (보유:${currentPoint}, 필요:${requiredPoint})`,
      );
    }

    // n개의 사진이 업로드 되었으면 n번 순환하면서 데이터 저장
    for (const photo of photos) {
      // 사진 정보를 저장한다.
      const newPhoto = new Photo();
      newPhoto.name = photo.name;
      newPhoto.url = photo.url;
      newPhoto.user = user;
      newPhoto.folder = folder;
      await manager.save(Photo, newPhoto);

      // 포인트 100점 사용을 저장한다 (포인트 사용의 경우는 음수로 표현)
      const newPoint = new Point();
      newPoint.type = PointType.Used;
      newPoint.amount = PhotoService.PHOTO_POINT;
      newPoint.description = `${newPhoto.name} 사진 업로드`;
      newPoint.user = user;
      newPoint.folder = folder;
      newPoint.photo = newPhoto;
      await manager.save(Point, newPoint);

      // 현재 사용이 가능한 포인트 잔여 수량을 가져온다 (x 번째 적립분 부터 순서대로)
      const pointLogParents = await manager
        .createQueryBuilder(PointLog, 'point_log')
        .leftJoin('point_log.point', 'point')
        .select('point.userId', 'userId')
        .addSelect('point_log.parentId', 'parentId')
        .addSelect('SUM(point_log.amount)', 'leftAmount')
        .addSelect('MIN(point_log.createdAt)', 'oldestCreateAt')
        .where('point.userId = :userId', { userId })
        .groupBy('point_log.parentId')
        .having('leftAmount > 0')
        .orderBy('oldestCreateAt', 'ASC')
        .getRawMany();

      // 포인트 상세 이력 정보를 저장한다
      let usedAmount = newPoint.amount;
      for (const pointLogParent of pointLogParents) {
        usedAmount += parseInt(pointLogParent.leftAmount);

        const newPointLog = new PointLog();
        newPointLog.point = newPoint;
        newPointLog.parent = await manager.findOne(
          PointLog,
          pointLogParent.parentId,
        );

        // 0 또는 양수일 경우는 n 번째 적립한 포인트 내에서 차감이 가능한 경우이고
        if (usedAmount >= 0) {
          newPointLog.amount = newPoint.amount;
          await manager.save(PointLog, newPointLog);
          break;
        }

        // 그 외 음수일 경우는 n 번째 적립한 포인트를 모두 사용한 것으로 저장한다
        newPointLog.amount = newPoint.amount - usedAmount;
        await manager.save(PointLog, newPointLog);
      }

      // p개의 태그가 입력 되었다면 t개의 사진에 동일한 p개의 태그 정보를 생성한다
      for (const tag of tags) {
        const newTag = new Tag();
        newTag.name = tag.name;
        newTag.photo = newPhoto;
        await manager.save(Tag, newTag);
      }
    }

    return 'This action adds a new photo';
  }

  async findAll(userId: number, folderId: number) {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    const folder = await this.folderRepository.findOne(folderId);
    if (!folder) {
      throw new NotFoundException('해당 폴더를 찾을 수 없습니다.');
    }

    return this.photoRepository.find({
      where: { user, folder },
      order: { createdAt: 'DESC' },
    });
  }
}
