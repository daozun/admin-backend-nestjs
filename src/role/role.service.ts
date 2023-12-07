import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseResponse } from "../common/baseReponse";
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private articleRepository: Repository<Role>
  ) {}
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll() {
    const obj = await this.articleRepository.find();

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
