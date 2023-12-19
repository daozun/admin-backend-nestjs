import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsEnum, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

type MENUIDTYPE = {
    id: string,
    children?: MENUIDTYPE[]
}

export class CreateRoleDto {
    @ApiProperty()
    @IsArray({
        message: '参数必须为数组'
    })
    @ArrayMinSize(1, {
        message: '数组内至少有一项'
    })    
    menuIdList: MENUIDTYPE[];
}
