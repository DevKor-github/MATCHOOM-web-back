import { Point } from "src/domain/point/entities/point.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

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

  @Column({ type: "varchar", nullable: true, length: 14 })
  account: string;

  @Column({ default: true })
  isOnboarding: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Point, point => point.user, { nullable: true })
  points: Point[]
}