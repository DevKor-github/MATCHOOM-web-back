import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}