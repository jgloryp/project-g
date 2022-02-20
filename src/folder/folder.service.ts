import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async create(userId: number, folder: CreateFolderDto) {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    const newFolder = this.folderRepository.create(folder);
    newFolder.user = user;

    return this.folderRepository.save(newFolder);
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
