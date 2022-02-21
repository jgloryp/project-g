import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  Get,
  Body,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { ListPhotoItem } from './dto/list-photo.dto';

@ApiTags('feature/photos')
@Controller('users')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post(':userId/folders/:folderId/photos')
  @ApiOperation({
    summary: `사용자의 폴더에 사진들을 업로드 (사진을 업로드 하는데 100포인트가 필요하며, 사진 갯수에 따라 포인트 필요량을 계산)`,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        tags: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Param('userId') userId: string,
    @Param('folderId') folderId: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body('tags') tags: string,
  ) {
    if (files.length === 0) {
      throw new BadRequestException('사진 파일이 첨부 되지 않았습니다');
    }
    if (!tags) {
      throw new BadRequestException('태그가 입력 되지 않았습니다');
    }

    return this.photoService.create(
      +userId,
      +folderId,
      files.map(
        (file) =>
          new CreatePhotoDto(
            file.originalname,
            `https://fakepath/${file.filename}`,
          ),
      ),
      tags.split(',').map((tag) => new CreateTagDto(tag)),
    );
  }

  @Get(':userId/folders/:folderId/photos')
  @ApiOperation({
    summary: `사용자의 폴더에 있는 사진 목록을 최근 저장 순으로 반환`,
  })
  async findAll(
    @Param('userId') userId: string,
    @Param('folderId') folderId: string,
  ) {
    const photos = await this.photoService.findAll(+userId, +folderId);

    return photos.map(
      (photo) => new ListPhotoItem(photo.name, photo.url, photo.createdAt),
    );
  }
}
