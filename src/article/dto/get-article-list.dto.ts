import { ApiProperty } from "@nestjs/swagger";
import { StatusEnum } from "../entities/article.entity";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { Type } from "class-transformer";

export class GetArticleListDto {
    @ApiProperty()
    @Type(() => Number)
    @IsInt({ message: '页码必须为整数' })
    @Min(1, { message: '页码必须大于或等于1' })
    pageNo: number

    @ApiProperty()
    @Type(() => Number)
    @IsInt({ message: '每页显示条数必须为整数' })
    // @IsNotEmpty({ message: '每页显示条数不能为空' })
    // @IsNumber({
    //     allowNaN: false,
    //     allowInfinity: false,
    //     maxDecimalPlaces: 0      
    // }, { message: '每页显示条数必须为数字' })
    @Min(5, { message: '每页显示条数必须大于或等于5' })
    pageSize: number

    @ApiProperty()
    @IsOptional()
    @IsString({ message: '标题格式错误'})
    title: string;

    @ApiProperty()
    @IsOptional()
    @IsString({ message: '作者数据格式错误' })
    author: string;   
    
    @ApiProperty()
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: '状态错误' })
    status: StatusEnum    
}