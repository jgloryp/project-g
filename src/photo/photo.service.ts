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
import { Folder } from '../folder/entities/folder.entity';
import { User } from '../user/entities/user.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { Photo } from './entities/photo.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class PhotoService {
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
  @Transaction({ isolation: 'SERIALIZABLE' })
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

    // n개의 사진이 업로드 되었으면 n번 순환하면서 데이터 저장
    for (const photo of photos) {
      const newPhoto = new Photo();
      newPhoto.name = photo.name;
      newPhoto.url = photo.url;
      newPhoto.user = user;
      newPhoto.folder = folder;

      await manager.save(Photo, newPhoto);

      // n개의 태그가 입력 되었다면 n개의 사진에 동일한 n개의 태그 생성한다
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
