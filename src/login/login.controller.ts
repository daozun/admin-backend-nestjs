import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { Public } from '../auth/auth.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('登录(login)')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Public()
  @Post()
  @ApiResponse({ status: 200 })
  login(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.login(createLoginDto);
  }
}
