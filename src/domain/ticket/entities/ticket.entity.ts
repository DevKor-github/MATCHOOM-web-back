import { Studio } from "src/domain/studio/entities/studio.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}
