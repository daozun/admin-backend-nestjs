import { Module, Logger } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RoleMenu } from './entities/role_menu.entity';
import { Menu } from '@/menu/entities/menu.entity';
import { MenuService } from "@/menu/menu.service"

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleMenu, Menu])],
  controllers: [RoleController],
  providers: [RoleService, MenuService, Logger],
})
export class RoleModule {}
