import { PointTransaction } from "src/domain/point-transaction/entities/point-transaction.entity";
import { Studio } from "src/domain/studio/entities/studio.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  point: number;

  @Column()
  price: number;

  @ManyToOne(() => Studio, (studio) => studio.tickets, { nullable: true })
  studio: Studio

  @OneToMany(() => PointTransaction, pointTransaction => pointTransaction.ticket)
  pointTransactions: PointTransaction[];
}
