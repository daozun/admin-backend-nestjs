import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { Exclude, Transform, Type } from 'class-transformer';
import * as moment from 'moment';

export enum DeleteFlagEnum {
    DELETE = 1,
    UNDELETE = 0
}

@Entity()
export abstract class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    // @PrimaryColumn({type:"varchar", generated:"uuid",length:36})
    id: string

    @CreateDateColumn()
    createtime: Date;

    @UpdateDateColumn()
    // @Transform(value => moment(value as unknown as Date).format("YYYY-MM-DD HH:mm:ss"), { toClassOnly: true })
    // @Transform(value => (value as unknown as Date).toISOString(), {
    //     toPlainOnly: true
    // })    
    updatetime: Date;    
  
    // enum 类型在数据库中是字符串
    @Exclude()
    @Column({
        type: 'tinyint',
        default: 0
    })
    deleteflag: DeleteFlagEnum;
}