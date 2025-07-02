import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
export declare class SeedService {
    private userRepository;
    private orderRepository;
    private productRepository;
    private orderItemRepository;
    constructor(userRepository: Repository<User>, orderRepository: Repository<Order>, productRepository: Repository<Product>, orderItemRepository: Repository<OrderItem>);
    seedAll(): Promise<void>;
    seedUsers(): Promise<void>;
    seedProducts(): Promise<void>;
    seedOrders(): Promise<void>;
}
