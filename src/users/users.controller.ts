import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  HttpStatus,
  UseGuards,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { User } from './entities/user.entity';
import { BaseResponse } from "../common/baseReponse";
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { UploadAvatarDto } from './dto/upload-avatar.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('用户相关(user)')
@ApiHeader({
  name: 'access_token',
  description: '需要在header中添加token',
})
@UseInterceptors(LoggingInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userObj = await this.usersService.findOne(id);

    if(userObj) {
      return new BaseResponse(HttpStatus.OK, null, userObj)
    }

    return new BaseResponse(HttpStatus.NOT_FOUND, '没有此用户', null)
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('/upload/avatar')
  async uploadAvatar(@Body() uploadAvatarDto: UploadAvatarDto, @UploadedFile(
    new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: /(jpg|jpeg|png)$/,
    })
    .addMaxSizeValidator({
      maxSize: 3145728 // 3mb
    }) 
    .build({
      exceptionFactory(error) {
        if(error.includes("type")) {
          return new BaseResponse(HttpStatus.UNPROCESSABLE_ENTITY, "文件格式错误", null)
        }

        if(error.includes("size")) {
          throw new BaseResponse(HttpStatus.UNPROCESSABLE_ENTITY, "文件过大", null)
        }
      },      
    }),
  ) file: Express.Multer.File,) {
    const newDto = Object.assign(uploadAvatarDto, {
      avatar: file.buffer.toString('base64')
    })

    const userObj = await this.usersService.uploadAvatar(newDto);

    if(userObj) {
      return new BaseResponse(HttpStatus.OK, "头像上传成功", null)
    }

    return new BaseResponse(HttpStatus.NOT_FOUND, '头像上传失败', null)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
