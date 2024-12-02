import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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

  @Column({ default: false })
  isStudio: boolean;

  @Column({ nullable: true })
  accountHolder: string;

  @CreateDateColumn()
  createdAt: Date;
}