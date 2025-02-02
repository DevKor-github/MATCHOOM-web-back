import { Lecture } from "src/domain/lecture/entities/lecture.entity";
import { Studio } from "src/domain/studio/entities/studio.entity";
import { User } from "src/domain/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RefundStatus } from "../enums/refund-status.enum";

const refundStatus = ['pending', 'approved', 'rejected'];

@Entity()
export class Refund {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RefundStatus, default: RefundStatus.Pending})
  status: RefundStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Lecture,)
  lecture: Lecture;

  @ManyToOne(() => User, user => user.refunds)
  user: User;

  @ManyToOne(() => Studio)
  studio: Studio;
}