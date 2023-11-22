import { Column, Entity } from "typeorm";
import { BaseEntity } from '../../common/baseEntity';
import { Exclude } from "class-transformer";

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
        type: 'tinyint',
        default: 0
    })
    status: StatusEnum;

    @Column({ length: 10 })
    author: string;
}
