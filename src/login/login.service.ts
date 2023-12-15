import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { Login } from './entities/login.entity';
import { User } from "../users/entities/user.entity"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseResponse } from "../common/baseReponse";
import { isMatch } from "../utils/index";
import { AuthService } from "../auth/auth.service";
import * as _ from 'lodash';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,
    @InjectRepository(User)    
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}
  
  async login(createLoginDto: CreateLoginDto): Promise<any> {
    const account = await this.userRepository
      .createQueryBuilder("user")
      .where("user.username = :username", { username: createLoginDto.username })
      .addSelect('user.password')
      .getOne()

    if(!account) {
      return new BaseResponse(HttpStatus.NOT_FOUND, "用户名不存在", null)
    }

    const match = await isMatch(createLoginDto.password, account.password);
    if(!match) {
      return new BaseResponse(HttpStatus.UNAUTHORIZED, "密码错误", null)
    }

    const loginEntity = new Login();

    loginEntity.username = createLoginDto.username;
    loginEntity.user_id = account.id;    

    const isLogin = await this.loginRepository.save(loginEntity);

    if(isLogin) {
      const token = await this.authService.generateToken({
        username: createLoginDto.username,
        userId: account.id,
        user_role: account.user_role
      });

      return new BaseResponse(HttpStatus.OK, "登录成功", {
        token: token,
        userInfo: _.omit(account, ['password'])
      })
    }
  }
}
