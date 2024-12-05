import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./announcement.entity";
import { Lecture } from "src/domain/lecture/entities/lecture.entity";
import { User } from "src/domain/user/entities/user.entity";
import { Media } from "src/application/media/entities/media.entity";
import { Ticket } from "src/domain/ticket/entities/ticket.entity";

@Entity()
export class Studio{
    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(()=> Announcement, (announcement)=>announcement.studio)
    announcements: Announcement[]

    @OneToMany(()=>Lecture, (lecture)=>lecture.studio)
    lectures: Lecture[]

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    policy: string

    @ManyToOne(()=> User, (user)=> user.studio)
    admin: User[]
    
    @OneToMany(()=> Media, (media) => media.studio)
    medias: Media[]

    @OneToMany(() => Ticket, (ticket) => ticket.studio, { nullable: true })
    tickets: Ticket[];
}