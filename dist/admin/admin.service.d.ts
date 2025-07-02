import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AdminService {
    private readonly userRepository;
    private readonly productRepository;
    constructor(userRepository: Repository<User>, productRepository: Repository<Product>);
    getDashboardStats(): Promise<{
        products: number;
        suppliers: number;
        activeCustomers: number;
    }>;
    getCustomers(): Promise<User[]>;
    getSuppliers(): Promise<User[]>;
    updateUserStatus(userId: number, isActive: boolean): Promise<User>;
}
