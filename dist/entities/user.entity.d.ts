import { Order } from './order.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
    orders: Order[];
    createdAt: Date;
    updatedAt: Date;
}
