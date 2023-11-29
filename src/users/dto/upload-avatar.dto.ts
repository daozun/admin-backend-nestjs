import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadAvatarDto {
  @IsNotEmpty({ message: '用户ID不能为空' })
  @IsString({ message: '用户ID数据格式错误' })
  userId: string;

  @ApiProperty()
  avatar: string;
}
