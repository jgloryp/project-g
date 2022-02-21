import {
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
import { PointLog } from '../point/entities/point-log.entity';
import { Point, PointType } from '../point/entities/point.entity';
import { User } from '../user/entities/user.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { Folder } from './entities/folder.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
  ) {}

  @Transaction({ isolation: 'READ COMMITTED' })
  async create(
    userId: number,
    folder: CreateFolderDto,
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

    // 새 폴더를 생성한다
    const newFolder = manager.create(Folder, folder);
    newFolder.user = user;
    await manager.save(Folder, newFolder);

    // 폴더 생성에 따른 포인트 1000점을 생성한다
    const newPoint = manager.create(Point, {
      type: PointType.Earned,
      amount: 1000,
      description: `${newFolder.name} 폴더 생성`,
      user: user,
      folder: newFolder,
    });
    await manager.save(Point, newPoint);

    // 포인트 1000점 생성의 이력을 포인트 상세 이력에 생성한다
    const newPointLog = manager.create(PointLog, {
      amount: 1000,
      point: newPoint,
    });
    await manager.save(PointLog, newPointLog);

    // 최초 생성(=적립의 경우)된 포인트 상세 이력은 parent 를 자기 자신으로 지정한다
    newPointLog.parent = newPointLog;
    await manager.save(PointLog, newPointLog);

    return 'This action adds a new folder';
  }

  async findAll(userId: number) {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    return this.folderRepository
      .createQueryBuilder('folder')
      .loadRelationCountAndMap('folder.countPhotos', 'folder.photos')
      .where('folder.userId = :userId', { userId })
      .orderBy('folder.createdAt', 'ASC')
      .getMany();
  }
}
