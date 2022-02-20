import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Folder } from './entities/folder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Folder])],
  controllers: [FolderController],
  providers: [FolderService],
  exports: [TypeOrmModule],
})
export class FolderModule {}
