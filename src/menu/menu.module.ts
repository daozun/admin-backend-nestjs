import { Module, Logger } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { RoleMenu } from "../role/entities/role_menu.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Menu, RoleMenu])],  
  controllers: [MenuController],
  providers: [MenuService, Logger],
})
export class MenuModule {}
