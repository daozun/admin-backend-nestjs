import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegisterDto {
    @ApiProperty()
    @IsNotEmpty({ message: '用户名为空' })
    @IsString({ message: '用户名格式错误'})
    username: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: '密码为空' })
    @IsString({ message: '密码格式错误' })
    password: string;
}
