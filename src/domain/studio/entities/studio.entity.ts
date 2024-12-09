import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./announcement.entity";
import { Lecture } from "src/domain/lecture/entities/lecture.entity";
import { User } from "src/domain/user/entities/user.entity";
import { Media } from "src/application/media/entities/media.entity";
import { Ticket } from "src/domain/ticket/entities/ticket.entity";
import { Point } from "src/domain/point/entities/point.entity";

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

    @OneToOne(() => User)
    admin: User
    
    @OneToMany(()=> Media, (media) => media.studio)
    medias: Media[]
  
    @OneToOne(()=> Media, {nullable: true})
    @JoinColumn()
    thumbnail: Media
  
    @OneToMany(() => Ticket, (ticket) => ticket.studio, { nullable: true })
    tickets: Ticket[];

    @Column()
    pointExpiration: number;

    @OneToMany(() => Point, (point) => point.studio, { nullable: true })
    points: Point[];
}