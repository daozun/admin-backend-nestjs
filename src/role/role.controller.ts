import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto, @Request() req: any) {
    return this.roleService.create(createRoleDto, req);
  }

  @Post('menu')
  createRoleMenu(@Body() createRoleDto: CreateRoleDto, @Request() req: any) {
    return this.roleService.createRoleMenu(createRoleDto, req);
  }

  @Get('menu')
  findAllRoleMenu(@Request() req: any) {
    return this.roleService.findAllRoleMenu(req);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.roleService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
