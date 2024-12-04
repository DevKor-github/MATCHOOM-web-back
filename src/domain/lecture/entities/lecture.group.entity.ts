import { Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lecture } from "./lecture.entity";

@Entity()
export class LectureGroup{
    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(()=>Lecture, (lecture)=>lecture.group)
    lectures: Lecture[]
}