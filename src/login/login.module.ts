import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';
import { User } from "../users/entities/user.entity"
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Login, User]), UsersModule, AuthModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
