import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Announcement } from "./announcement.entity";
import { Lecture } from "src/domain/lecture/entities/lecture.entity";
import { User } from "src/domain/user/entities/user.entity";

@Entity()
export class Studio{
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
    
    /*@OneToMany()
    files: Attachments[]

    @OneToOne(()=> User, (user)=> user.studio)
    admin: User
    */
}