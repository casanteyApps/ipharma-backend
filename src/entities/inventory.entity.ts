import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  holder_id: string; // Corresponds to a supplier's ID

  @Column()
  product_id: string;

  @Column()
  quantity: number;

  @Column('float')
  unit_price: number;
}
