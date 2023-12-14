import { Column, Entity } from "typeorm";
import { BaseEntity } from '../../common/baseEntity';
import { UserRole } from "../../users/entities/user.entity";

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
}
