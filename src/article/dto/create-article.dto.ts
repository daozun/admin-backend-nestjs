import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { StatusEnum } from "../entities/article.entity";

export class CreateArticleDto {
    @ApiProperty()
    @IsNotEmpty({ message: '标题不能为空' })
    @IsString({ message: '标题格式错误'})
    @MinLength(1, {message: '标题不能少于1个字符'})
    @MaxLength(20, { message: '标题不能超过20个字符'})    
    title: string;

    @ApiProperty()
    @IsNotEmpty({ message: '作者不能为空' })
    @IsString({ message: '作者数据格式错误' })
    @MinLength(1, { message: '作者不能少于1个字符' })
    @MaxLength(10, { message: '作者不能超过10个字符'})      
    author: string;

    @ApiProperty()
    @IsNotEmpty({ message: '状态不能为空' })
    @IsEnum(StatusEnum, { message: '状态错误' })
    status: StatusEnum
}
