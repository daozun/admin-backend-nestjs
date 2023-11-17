import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/baseEntity';

@Entity({
    name: "register"
})
export class Register extends BaseEntity{
    @Column({ length: 15 })
    username: string;

    @Column({ length: 36, unique: false })
    user_id?: string   
}
