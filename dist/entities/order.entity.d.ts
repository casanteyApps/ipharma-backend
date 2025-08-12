import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
export declare class Order {
    id: number;
    userId: number;
    user: User;
    totalAmount: number;
    status: string;
    shippingAddress: string;
    orderItems: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}
