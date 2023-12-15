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
import { Article } from "./article/entities/article.entity";
import { Role } from "./role/entities/role.entity";
import { RoleMenu } from "./role/entities/role_menu.entity";
import { Menu } from "./menu/entities/menu.entity";
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from "./auth/auth.guard";
import { ArticleModule } from './article/article.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    ThrottlerModule.forRoot([{
      ttl: Number(process.env.THROTTLE_RATE_LIMIT_PERIOD),
      limit: Number(process.env.THROTTLE_RATE_LIMIT),
    }]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      // autoLoadEntities: true,
      entities: [User, Login, Register, Article, Role, Menu, RoleMenu],
      synchronize: process.env.FLAG === 'dev' ? true : false,
      logging: true
    }), UsersModule, RegisterModule, LoginModule, AuthModule, ArticleModule, RoleModule, MenuModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
