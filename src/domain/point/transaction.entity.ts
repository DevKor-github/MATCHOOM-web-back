import { Lecture } from "src/domain/lecture/entities/lecture.entity";
import { Studio } from "src/domain/studio/entities/studio.entity";
import { Ticket } from "src/domain/ticket/entities/ticket.entity";
import { User } from "src/domain/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Studio)
  studio: Studio;

  @Column()
  type: 'charge' | 'purchase';

  @ManyToOne(() => Lecture, { nullable: true })
  lecture: Lecture;

  @ManyToOne(() => Ticket, { nullable: true })
  ticket: Ticket;

  @CreateDateColumn()
  createdAt: Date;
}