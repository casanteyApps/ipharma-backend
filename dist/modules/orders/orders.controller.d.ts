import { OrdersService } from './orders.service';
import { Order } from '../../entities/order.entity';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    create(createOrderDto: any): Promise<Order>;
    update(id: string, updateOrderDto: Partial<Order>): Promise<Order>;
    remove(id: string): Promise<void>;
}
