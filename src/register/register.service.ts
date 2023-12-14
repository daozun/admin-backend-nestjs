import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UsersService } from '../users/users.service';
import { BaseResponse } from "../common/baseReponse";
import { encrypt, isMatch } from 'src/utils';
import { User } from "../users/entities/user.entity"
import { Register } from "./entities/register.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from "../users/entities/user.entity";

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);

  constructor(
    private readonly usersService: UsersService,     
    @InjectRepository(User)    
    private userRepository: Repository<User>,
    @InjectRepository(Register)    
    private registerRepository: Repository<Register>,
  ) {}

  async create(createRegisterDto: CreateRegisterDto): Promise<any> {
    const findUserByName = await this.usersService.findUserByName(createRegisterDto);

    if(findUserByName) {
      this.logger.log('用户名已存在');
      return new BaseResponse(HttpStatus.CONFLICT, '用户名已存在', null);
    }

    let encryptPassword = await encrypt(createRegisterDto.password);
    createRegisterDto.password = encryptPassword;
    createRegisterDto.user_role = UserRole.NORMAL;

    const isCreate = await this.usersService.create(createRegisterDto);

    if(isCreate) {
      const account = await this.userRepository
      .createQueryBuilder("user")
      .where("user.username = :username", { username: createRegisterDto.username })
      .getOne()

      const registerEntity = new Register();
      registerEntity.username = createRegisterDto.username;
      registerEntity.user_id = account.id;  
      
      await this.registerRepository.save(registerEntity);

      this.logger.log('注册成功');
      return new BaseResponse(HttpStatus.CREATED, "注册成功", null)
    }

    this.logger.log('注册失败');
    return new BaseResponse(HttpStatus.INTERNAL_SERVER_ERROR, "注册失败", null)
  }
}
