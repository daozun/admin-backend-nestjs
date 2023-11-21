import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRegisterDto {
    @ApiProperty()
    @IsNotEmpty({ message: '用户名不能为空' })
    @IsString({ message: '用户名格式错误'})
    @MinLength(1, {message: '用户名不能少于1个字符'})
    @MaxLength(15, { message: '用户名不能超过15个字符'})       
    username: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: '密码不能为空' })
    @IsString({ message: '密码格式错误' })
    @MinLength(1, {message: '密码不能少于1个字符'})
    @MaxLength(36, { message: '密码不能超过36个字符'})       
    password: string;
}
