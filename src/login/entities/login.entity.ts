import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/baseEntity';

@Entity({
    name: "login"
})
export class Login extends BaseEntity{
    @Column({ length: 15 })
    username: string;

    @Column({ length: 36, unique: false })
    user_id?: string    
}
