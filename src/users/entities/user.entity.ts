import { Entity, Column, OneToMany, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/baseEntity';
import { Exclude } from 'class-transformer';

export enum UserRole {
    ADMIN = "admin",
    NORMAL = "normal"
}

@Entity({
    name: "users"
})
export class User extends BaseEntity{
    @Column({ length: 15 })
    username: string;
  
    @Exclude()
    @Column({ length: 100, select: false })
    password: string;

    @Column({ type: "longtext", nullable: true, default: null})
    avatar: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.NORMAL,
    })
    user_role: UserRole    
}
