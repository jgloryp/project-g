import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { MulterModule } from '@nestjs/platform-express';
import { Photo } from './entities/photo.entity';
import { Folder } from '../folder/entities/folder.entity';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Folder, Photo, Tag]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [TypeOrmModule],
})
export class PhotoModule {}
