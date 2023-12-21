import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseResponse } from "../common/baseReponse";
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleMenu } from './entities/role_menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserRole } from "@/users/entities/user.entity"
import { DeleteFlagEnum } from "@/common/baseEntity";
import * as _ from 'lodash';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(RoleMenu)
    private roleMenuRepository: Repository<RoleMenu>,
    private dataSource: DataSource
  ) {}
  async create(createRoleDto: CreateRoleDto, req: any) {
    // TODO
  }

  async createRoleMenu(createRoleDto: CreateRoleDto, req: any) {
    const menuIdList = createRoleDto.menuIdList;

    try {
      await this.dataSource.manager.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.getRepository(RoleMenu).delete({})
        for (const item of menuIdList) {
          await transactionalEntityManager.getRepository(RoleMenu).save({
            role_code: req.user.user_role,
            menu_id: item.id
          })
        }
      })   
      
      return new BaseResponse(HttpStatus.OK, "添加成功", null)
    } catch (error) {
      return new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR, "系统错误", error)
    }
  }

  async findAllRoleMenu(req: any) {
    const list = await this.roleMenuRepository.find({
      where: {
        role_code: req.user.user_role === UserRole.NORMAL ? req.user.user_role : null,
        deleteflag: DeleteFlagEnum.UNDELETE
      }
    });
    
    const roleMenuList = _.uniqBy(list, 'menu_id');

    if(roleMenuList) {
      return new BaseResponse(HttpStatus.OK, "获取成功", roleMenuList)
    }

    return new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR, "系统错误", null)
  }

  async findAll(req: any) {
    let obj = null;

    if(req.user_role === UserRole.ADMIN) {
      obj = await this.roleRepository.findBy({
        deleteflag: DeleteFlagEnum.UNDELETE
      });
    } else {
      obj = await this.roleRepository.find({
        where: {
          code: req.user.user_role === UserRole.NORMAL ? req.user.user_role : null,
          deleteflag: DeleteFlagEnum.UNDELETE
        }
      });
    }

    if(obj) {
      return new BaseResponse(HttpStatus.OK, null, obj)
    }

    return new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR, "系统错误", null)
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
