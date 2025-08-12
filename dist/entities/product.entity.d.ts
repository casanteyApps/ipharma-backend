import { OrderItem } from './order-item.entity';
export declare class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    category: string;
    isActive: boolean;
    orderItems: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}
