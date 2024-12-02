import { Studio } from "src/domain/studio/entities/studio.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LectureGroup } from "./lecture.group.entity";

@Entity()
export class Lecture{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    instructor: string

    @Column()
    type: boolean

    @Column()
    date: Date

    @Column()
    openTime: Date
    
    @Column()
    closeTime: Date

    @Column()
    difficulty: number

    @Column("simple-array")
    genre: number[]

    @Column({type: "varchar", length: 500})
    description: string
    
    @Column()
    price: number
    
    @ManyToOne(()=> Studio, (studio)=>studio.lectures, {onDelete: "CASCADE"})
    studio: Studio

    @ManyToOne(()=> LectureGroup, (lecturegroup)=>lecturegroup.lectures, {onDelete: 'CASCADE'})
    group: LectureGroup
    /*
    @OneToOne(() => Attachments, (attachments) => attachments.lecture, {cascade: true})
    @JoinTable()
    file: Attachments
    */
}