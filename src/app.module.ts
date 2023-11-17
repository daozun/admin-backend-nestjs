import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { CustomNamingStrategy } from "./config/customNamingStrategy"
import { User } from "./users/entities/user.entity";
import { Login } from "./login/entities/login.entity";
import { Register } from "./register/entities/register.entity";
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from "./auth/auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,    
      // autoLoadEntities: true,
      entities: [User, Login, Register],
      synchronize: process.env.FLAG === 'dev' ? true : false,
      logging: true
  }), UsersModule, RegisterModule, LoginModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },],
})
export class AppModule {}
