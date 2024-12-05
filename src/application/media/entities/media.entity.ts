import { Lecture } from "src/domain/lecture/entities/lecture.entity";
import { Studio } from "src/domain/studio/entities/studio.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Media{
    @PrimaryGeneratedColumn()
    id: number
    
    @CreateDateColumn()
    date: Date

    @Column()
    filename: string

    @ManyToOne(()=> Studio, (studio)=>studio.medias, {onDelete: "CASCADE"})
    studio: Studio

    @OneToMany(() => Lecture, (lecture) => lecture.file)
    lectures: Lecture[]
}