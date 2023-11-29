import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encrypt, isMatch } from 'src/utils';
import { BaseResponse } from '../common/baseReponse';
import { UploadAvatarDto } from './dto/upload-avatar.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create (createUserDto: CreateUserDto): Promise<any> {
    return this.usersRepository.save(createUserDto);
  }

  async findUserByName(createUserDto: CreateUserDto): Promise<any> {
    return this.usersRepository
      .createQueryBuilder("users")
      .where("users.username = :username", { username: createUserDto.username })
      .getOne()
  }

  async uploadAvatar(uploadAvatar: UploadAvatarDto): Promise<any> {
    const obj = await this.usersRepository.findOneBy({
      id:uploadAvatar.userId
    })

    if(obj) {
      obj.avatar = uploadAvatar.avatar;
      return this.usersRepository.save(obj);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: String):Promise<User> {
    return this.usersRepository
      .createQueryBuilder("users")
      .where("users.id = :id", { id: id })
      .getOne()
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
