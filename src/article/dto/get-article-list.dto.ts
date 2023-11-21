import { ApiProperty } from "@nestjs/swagger";
import { StatusEnum, StatusType } from "../entities/article.entity";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class GetArticleListDto {
    @ApiProperty()
    @IsNotEmpty({ message: '当前页数不能为空' })
    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
        maxDecimalPlaces: 0      
    }, { message: '当前页数必须为数字' })
    pageNo: Number

    @ApiProperty()
    @IsNotEmpty({ message: '每页显示条数不能为空' })
    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
        maxDecimalPlaces: 0      
    }, { message: '每页显示条数必须为数字' })
    @Min(5, { message: '每页显示条数必须大于或等于5' })
    pageSize: Number

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
    @IsEnum(StatusEnum, { message: '状态错误' })
    status: StatusType    
}