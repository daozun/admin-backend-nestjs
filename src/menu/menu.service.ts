import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponse } from '../common/baseReponse';
import { buildTree } from "../utils"
import { DeleteFlagEnum } from "../common/baseEntity";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>
  ) {}  
  create(createMenuDto: CreateMenuDto) {
   return this.menuRepository.save(createMenuDto);
  }

  async findAll() {
    const list = await this.menuRepository.createQueryBuilder('menu')
    .where('menu.deleteflag = :deleteflag', { deleteflag: DeleteFlagEnum.UNDELETE })
    .getMany()

    const treeList = buildTree(list);

    if(list) {
      return new BaseResponse(HttpStatus.OK, null, treeList)
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

    return new BaseResponse(HttpStatus.BAD_REQUEST, "不是一个有效id", null)
  }

  async remove(id: string) {
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

    return new BaseResponse(HttpStatus.BAD_REQUEST, "不是一个有效id", null)
  }
}
