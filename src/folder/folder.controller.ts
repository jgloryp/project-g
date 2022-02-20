import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('feature/folder')
@Controller('users')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post(':userId/folders')
  @ApiOperation({
    summary: `사용자의 폴더 생성`,
  })
  create(
    @Param('userId') userId: string,
    @Body() createFolderDto: CreateFolderDto,
  ) {
    return this.folderService.create(+userId, createFolderDto);
  }

  @Get(':userId/folders')
  @ApiOperation({
    summary: `사용자의 폴더 반환`,
  })
  findAll(@Param('userId') userId: string) {
    return this.folderService.findAll(+userId);
  }
}
