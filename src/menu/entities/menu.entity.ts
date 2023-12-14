import { Column, Entity } from "typeorm";
import { BaseEntity } from '../../common/baseEntity';

@Entity({
    name: "menu"
})
export class Menu extends BaseEntity {
    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "varchar", default: null})
    path: string;
    
    @Column({ type: "varchar", default: null})
    meta: string;

    @Column({ type: "boolean", default: false})
    hidden: Boolean;

    @Column({ type: "boolean", default: false})
    alwaysShow: Boolean

    @Column({ type: "varchar", default: null})
    component: string;

    @Column({ type: "varchar", default: null})
    parent_id: string;

    @Column({ type: "varchar", default: null})
    redirect: string;

    @Column({ type: "int", default: null})
    level: number;
}
