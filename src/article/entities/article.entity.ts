import { Column, Entity } from "typeorm";
import { BaseEntity } from '../../common/baseEntity';
import { Exclude } from "class-transformer";

export type StatusType = 0 | 1;
export enum StatusEnum {
    DRAFT = 0,
    PUBLISHED = 1
}

@Entity({
    name: "article"
})
export class Article extends BaseEntity{
    @Column({ length: 20 })
    title: string;

    @Exclude()
    @Column({
        type: 'enum',
        enum: [0, 1],
        default: 0
    })
    status: StatusType;

    @Column({ length: 10 })
    author: string;
}
