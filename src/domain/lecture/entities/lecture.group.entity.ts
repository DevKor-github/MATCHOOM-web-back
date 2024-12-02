import { Entity, JoinTable, OneToMany } from "typeorm";
import { Lecture } from "./lecture.entity";

@Entity()
export class LectureGroup{
    @OneToMany(()=>Lecture, (lecture)=>lecture.group)
    @JoinTable()
    lectures: Lecture[]
}