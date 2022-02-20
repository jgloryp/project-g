import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from '../folder/entities/folder.entity';
import { User } from '../user/entities/user.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,

    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async create(userId: number, folderId: number, photos: CreatePhotoDto[]) {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    const folder = await this.folderRepository.findOne(folderId);
    if (!folder) {
      throw new NotFoundException('해당 폴더를 찾을 수 없습니다.');
    }

    for (const photo of photos) {
      const newPhoto = new Photo();

      newPhoto.name = photo.name;
      newPhoto.url = photo.url;
      newPhoto.user = user;
      newPhoto.folder = folder;

      await this.photoRepository.save(newPhoto);
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
