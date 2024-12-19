import { Studio } from "src/domain/studio/entities/studio.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "src/domain/user/entities/user.entity";
import { Media } from "src/application/media/entities/media.entity";

@Entity()
export class Lecture{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    instructor: string

    @Column({nullable: true})
    type: string

    @Column({type: 'json', nullable: true})
    lectureTime: {start: Date, end: Date}[]

    @Column()
    maxCapacity: number;

    @Column()
    minCapacity: number;

    @Column({type: "datetime"})
    applyStart: Date

    @Column({type: "datetime"})
    applyEnd: Date

    @Column()
    room: string;

    @Column({nullable: true})
    difficulty: number

    @Column({nullable: true})
    genre: number

    @Column({type: "varchar", length: 500, nullable: true})
    description: string
    
    @Column()
    price: number

    @Column({nullable: true})
    musicLink: string
    
    @ManyToOne(()=> Studio, (studio)=>studio.lectures, {onDelete: "CASCADE"})
    studio: Studio

    @ManyToMany(() => User, user => user.lectures)
    @JoinTable()
    student: User[]

    @ManyToOne(() => Media, (media) => media.lectures)
    file: Media
}