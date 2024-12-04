import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Studio } from "./studio.entity";

@Entity()
export class Announcement{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 30, update: false})
    title: string

    @CreateDateColumn({type: 'timestamp'})
    created: Date

    @Column({type: 'varchar', length: 500, update: false})
    contents: string

    @ManyToOne(()=>Studio, (studio)=>studio.announcements)
    studio: Studio
}