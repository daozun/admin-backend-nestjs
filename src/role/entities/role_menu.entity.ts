import { Column, Entity } from "typeorm";
import { BaseEntity } from '@/common/baseEntity';
import { UserRole } from "@/users/entities/user.entity";

export enum SelectEnum {
    SELECTED = 1,
    UNSELECTED = 0
}
@Entity({
    name: "role_menu"
})
export class RoleMenu extends BaseEntity {
    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.NORMAL,
    })
    role_code: UserRole;

    @Column()
    menu_id: string;    

    @Column({
        type: 'tinyint',
        default: 0
    })
    is_select: SelectEnum
}
