import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { BaseResponse } from "../common/baseReponse";

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    try {
      const saveObj = await this.menuService.create(createMenuDto);

      if(saveObj) {
        return new BaseResponse(HttpStatus.CREATED, "新增菜单成功", null)
      } else {
        return new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR, "新增菜单失败", null)
      }      
    } catch (error) {
      return new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR, "新增菜单失败", null)
    }    
  }

  @Get('list')
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const obj = await this.menuService.findOne(id);

      if(!obj) {
        return new BaseResponse(HttpStatus.BAD_REQUEST, "不是一个有效id", null)
      }
  
      return new BaseResponse(HttpStatus.OK, "获取成功", obj)        
    } catch (error) {
      return new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR, "获取失败", null)
    }    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
