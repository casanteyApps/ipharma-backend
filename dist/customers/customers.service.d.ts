import { Repository } from 'typeorm';
import { SourcingRequestDto, PlaceOrderDto } from './customer.dto';
import { Inventory } from '../entities/inventory.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { Transaction } from '../entities/transaction.entity';
export interface SourcingResult extends Inventory {
    name: string;
    total_cost: number;
}
export declare class CustomerService {
    private productRepository;
    private inventoryRepository;
    private userRepository;
    private transactionRepository;
    constructor(productRepository: Repository<Product>, inventoryRepository: Repository<Inventory>, userRepository: Repository<User>, transactionRepository: Repository<Transaction>);
    getAllProducts(): Promise<Product[]>;
    findBestPrices(sourcingDto: SourcingRequestDto): Promise<SourcingResult[]>;
    placeOrder(buyerId: string, orderDto: PlaceOrderDto): Promise<Transaction>;
}
