import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { StatusEnum } from "../entities/article.entity";
import { Type } from "class-transformer";

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
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
    @Type(() => Number)
    @IsInt({ message: '状态错误' })
    status: StatusEnum
}
