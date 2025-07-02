import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
export declare class SeedService {
    private userRepository;
    private productRepository;
    private orderRepository;
    private orderItemRepository;
    constructor(userRepository: Repository<User>, productRepository: Repository<Product>, orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>);
    seedAll(): Promise<void>;
    seedUsers(): Promise<void>;
    seedProducts(): Promise<void>;
    seedOrders(): Promise<void>;
}
