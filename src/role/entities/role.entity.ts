import { Column, Entity } from "typeorm";
import { BaseEntity } from '@/common/baseEntity';
import { UserRole } from '@/users/entities/user.entity';

@Entity({
    name: "role"
})
export class Role extends BaseEntity {
    @Column({ length: 100 })
    name: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.NORMAL,
    })
    code: UserRole;
}
