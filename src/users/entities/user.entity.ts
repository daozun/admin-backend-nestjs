import { Entity, Column, OneToMany, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/baseEntity';
import { Exclude } from 'class-transformer';

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
}
