import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { ListPhotoItem } from './dto/list-photo.dto';

@ApiTags('feature/photos')
@Controller('users')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post(':userId/folders/:folderId/photos')
  @ApiOperation({
    summary: `사용자의 폴더에 사진을 업로드 `,
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
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Param('userId') userId: string,
    @Param('folderId') folderId: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    // console.log(files);

    if (files.length === 0) {
      throw new BadRequestException('사진 파일이 첨부 되지 않았습니다');
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
