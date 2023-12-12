import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { Type } from "class-transformer";

const enum StatusEnum {
    UNACTIVATED = 0,
    ACTIVATED = 1,
}

export class CreateMenuDto {
    @ApiProperty()
    @IsNotEmpty({ message: '菜单名称不能为空' })
    @IsString({ message: '菜单名称格式错误'})
    @MinLength(1, {message: '菜单名称不能少于1个字符'})
    @MaxLength(20, { message: '菜单名称不能超过20个字符'})    
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: '路由不能为空' })
    @IsString({ message: '路由格式错误'})
    @MinLength(1, {message: '路由不能少于1个字符'})
    @MaxLength(100, { message: '路由不能超过100个字符'})    
    path: string;
    
    @ApiProperty()
    @IsNotEmpty({ message: '组件名不能为空' })
    @IsString({ message: '组件名格式错误'})
    @MinLength(1, {message: '组件名不能少于1个字符'})
    @MaxLength(100, { message: '组件名不能超过100个字符'})    
    component: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'level不能为空' })
    @IsInt({ message: 'level格式错误'})
    level: number;
    
    @ApiProperty()
    @IsNotEmpty({ message: 'parent_id不能为空' })
    @IsString({ message: 'parent_id格式错误'})
    parent_id: string;        
    
    @ApiProperty()
    @Type(() => Number)
    @IsInt({ message: '侧边栏显示参数错误' })
    hidden: StatusEnum

    @ApiProperty()
    @Type(() => Number)
    @IsInt({ message: '显示跟路由参数错误' })
    alwaysShow: StatusEnum

    @ApiProperty()
    @IsString({ message: '外部URL格式错误'})
    external: string; 
    
    @ApiProperty()
    @IsString({ message: '重定向格式错误'})
    redirect: string;
    
    @ApiProperty()
    @IsString({ message: '额外信息格式错误'})
    meta: string;        
}
