import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { OrderItem } from '../../entities/order-item.entity';
export declare class OrdersService {
    private orderRepository;
    private orderItemRepository;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>);
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    create(orderData: any): Promise<Order>;
    update(id: number, orderData: Partial<Order>): Promise<Order>;
    remove(id: number): Promise<void>;
}
