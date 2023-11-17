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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { User } from './entities/user.entity';
import { BaseResponse } from "../common/baseReponse";
import { AuthGuard } from "../auth/auth.guard";
import { ApiHeader, ApiTags } from '@nestjs/swagger';

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

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userObj = await this.usersService.findOne(id);

    if(userObj) {
      return new BaseResponse(HttpStatus.OK, null, userObj)
    }

    return new BaseResponse(HttpStatus.NOT_FOUND, 'User not found', null)
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
