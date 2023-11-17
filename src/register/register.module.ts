import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { UsersModule } from '../users/users.module';
import { Register } from './entities/register.entity';
import { User } from "../users/entities/user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Register, User]), UsersModule],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
