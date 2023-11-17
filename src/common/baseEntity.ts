import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export type DeleteFlagEnum = 0 | 1;

@Entity()
export abstract class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    // @PrimaryColumn({type:"varchar", generated:"uuid",length:36})
    id: string

    @CreateDateColumn()
    createtime: Date;

    @UpdateDateColumn()
    updatetime: Date;    
  
    @Exclude()
    @Column({
        type: 'enum',
        enum: [0, 1],
        default: 0
    })
    deleteflag: DeleteFlagEnum;
}