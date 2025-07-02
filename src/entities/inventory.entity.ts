import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  holder_id: number; // Corresponds to a supplier's ID

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column('float')
  unit_price: number;
}
