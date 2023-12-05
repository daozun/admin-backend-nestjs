import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { UsersModule } from '../users/users.module';
import { Register } from './entities/register.entity';
import { User } from "../users/entities/user.entity"
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ThrottlerBehindProxyGuard } from "../throttler-behind-proxy.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forFeature([Register, User]), UsersModule
  ],
  controllers: [RegisterController],
  providers: [RegisterService, {
    provide: APP_GUARD,
    useClass: ThrottlerBehindProxyGuard,
  },],
})
export class RegisterModule { }
