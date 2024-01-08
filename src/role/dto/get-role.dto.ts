import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { UserRole } from "@/users/entities/user.entity"

export class GetRoleDto {
    @ApiProperty()
    @IsString({ message: '角色必须为字符串' })
    role: UserRole
}