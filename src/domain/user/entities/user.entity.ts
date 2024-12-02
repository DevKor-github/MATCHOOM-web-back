import { Lecture } from "src/domain/lecture/entities/lecture.entity";
import { Studio } from "src/domain/studio/entities/studio.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['oauthId', 'phone'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 60 })
  oauthId: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  name: string;

  @Column({ type: "varchar", nullable: true })
  phone: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  bank: string;

  @Column({ type: "varchar", nullable: true })
  account: string;

  @Column({ default: true })
  isOnboarding: boolean;

  @CreateDateColumn({ default: true })
  createdAt: Date;

  @ManyToMany(() => Lecture, lecture => lecture.student)
  lectures: Lecture[]

  @OneToMany(()=> Studio, (studio)=>studio.admin)
  studio: Studio

}