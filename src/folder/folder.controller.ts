import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListFolderItem } from './dto/list-folder.dto';

@ApiTags('feature/folder')
@Controller('users')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post(':userId/folders')
  @ApiOperation({
    summary: `사용자의 폴더 생성 (폴더 생성에 따른 포인트 1000점을 생성한다)`,
  })
  create(
    @Param('userId') userId: string,
    @Body() createFolderDto: CreateFolderDto,
  ) {
    return this.folderService.create(+userId, createFolderDto);
  }

  @Get(':userId/folders')
  @ApiOperation({
    summary: `사용자의 폴더 목록을 사진 갯수와 함께 생성순으로 반환`,
  })
  async findAll(@Param('userId') userId: string) {
    const folders = await this.folderService.findAll(+userId);

    return folders.map(
      (folder) =>
        new ListFolderItem(folder.name, folder.createdAt, folder.countPhotos),
    );
  }
}
