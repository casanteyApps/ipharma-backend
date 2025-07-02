import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buyer_id: string;

  @Column()
  seller_id: string;

  @Column()
  product_id: string;

  @Column()
  quantity: number;

  @Column('float')
  total_cost: number;

  @Column()
  date: string;
}
