import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
