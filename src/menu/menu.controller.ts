import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, Request } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { BaseResponse } from "@/common/baseReponse";
import { UserRole } from "@/users/entities/user.entity";

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto, @Request() req: any) {
    if(req.user.user_role == UserRole.NORMAL) {
      return new BaseResponse(HttpStatus.FORBIDDEN, "权限不足", null)
    }

    try {
      const saveObj = await this.menuService.create(createMenuDto, req);

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

  @Get('children/:id')
  async findChildren(@Param('id') id: string) {
    try {
      const list = await this.menuService.findChildren(id);

      if(!list) {
        return new BaseResponse(HttpStatus.BAD_REQUEST, "不是一个有效id", null)
      }
  
      return new BaseResponse(HttpStatus.OK, "获取成功", list)        
    } catch (error) {
      return new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR, "获取失败", null)
    }    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto, @Request() req: any) {
    if(req.user.user_role == UserRole.NORMAL) {
      return new BaseResponse(HttpStatus.FORBIDDEN, "权限不足", null)
    }

    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    if(req.user.user_role == UserRole.NORMAL) {
      return new BaseResponse(HttpStatus.FORBIDDEN, "权限不足", null)
    }

    return this.menuService.remove(id);
  }
}
