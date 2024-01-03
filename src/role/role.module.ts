import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RoleMenu } from './entities/role_menu.entity';
import { Menu } from '@/menu/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleMenu, Menu])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
