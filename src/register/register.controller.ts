import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { Public } from '../auth/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('注册(register')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Public()
  @Post()
  create(@Body() createRegisterDto: CreateRegisterDto): Promise<CreateRegisterDto> {
    return this.registerService.create(createRegisterDto);
  }
}
