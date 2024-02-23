import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { DataSource, Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { RoleMenu } from "@/role/entities/role_menu.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponse } from '@/common/baseReponse';
import { listToTree, sortByPriority } from "@/utils"
import { DeleteFlagEnum } from "@/common/baseEntity";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(RoleMenu)
    private dataSource: DataSource,
    private logger: Logger
  ) {}  
  async create(createMenuDto: CreateMenuDto, req: any):Promise<any> {
    return await this.menuRepository.save(createMenuDto)
  }

  async findAll() {
    const list = await this.menuRepository.createQueryBuilder('menu')
    .where('menu.deleteflag = :deleteflag', { deleteflag: DeleteFlagEnum.UNDELETE })
    .getMany()

    const treeList = listToTree(list);
    const sortedTree = sortByPriority(treeList)

    if(list) {
      this.logger.log("获取菜单成功, 服务名: %s", MenuService.name);
      return new BaseResponse(HttpStatus.OK, null, sortedTree)
    }

    return new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR, "系统错误", null)
  }

  async findOne(id: string) {
    const obj = await this.menuRepository.findOneBy({
      deleteflag: DeleteFlagEnum.UNDELETE,
      id:id
    })

    return obj;
  }

  async findChildren(id: string) {
    const list = await this.menuRepository.findBy({
      deleteflag: DeleteFlagEnum.UNDELETE,
      parent_id: id
    })

    return list;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    const obj = await this.findOne(id);

    if(obj) {
      Object.assign(obj, updateMenuDto);

      const saveObj = await this.menuRepository.save(obj).catch(err => err);

      if(saveObj.code) {
        return new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR, saveObj.code, null)
      } else {
        return new BaseResponse(HttpStatus.OK, "更新成功", null)
      }      
    }

    this.logger.error("不是一个有效id, menu.update")
    return new BaseResponse(HttpStatus.BAD_REQUEST, "不是一个有效id", null)
  }

  async remove(id: string) {
    const parentObj = await this.menuRepository.findOneBy({
      parent_id: id,
    })

    if(parentObj) {
      return new BaseResponse(HttpStatus.BAD_REQUEST, "请先删除其下的子菜单", null)
    }

    const obj = await this.findOne(id);

    if(obj) {
      obj.deleteflag = DeleteFlagEnum.DELETE;

      const saveObj = await this.menuRepository.save(obj).catch(err => err);

      if(saveObj.code) {
        return new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR, saveObj.code, null)
      } else {
        return new BaseResponse(HttpStatus.OK, "删除成功", null)
      }
    }

    this.logger.error("不是一个有效id, menu.remove")
    return new BaseResponse(HttpStatus.BAD_REQUEST, "不是一个有效id", null)
  }
}
