import { Studio } from "src/domain/studio/entities/studio.entity";
import { User } from "src/domain/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  point: number;

  @Column()
  expiration: Date;

  @CreateDateColumn({ name: 'purchased_at' })
  purchasedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.points, { onDelete: 'CASCADE' })
  user: User

  @ManyToOne(() => Studio, (studio) => studio.points, { nullable: true })
  studio: Studio;

}