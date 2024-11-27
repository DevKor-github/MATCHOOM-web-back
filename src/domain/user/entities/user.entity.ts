import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['oauthId'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 60 })
  oauthId: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar" })
  phone: string;

  @Column({ type: "varchar" })
  account: string;

  @Column({ default: false })
  isOnboarding: boolean;
}