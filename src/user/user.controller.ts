import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('feature/user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: `사용자 생성 (미리 두 개의 사용자가 생성 되어 있습니다)`,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: `사용자 목록 반환`,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: `사용자 정보 반환`,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // 명세에 없는 엔드포인트는 주석처리
  //
  // @Patch(':id')
  // @ApiOperation({
  //   summary: `사용자 정보 수정`,
  // })
  // update(@Param('id') id: string, @Body() user: UpdateUserDto) {
  //   return this.userService.update(+id, user);
  // }

  // @Delete(':id')
  // @ApiOperation({
  //   summary: `사용자 정보 삭제`,
  // })
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
