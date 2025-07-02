import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { UpdateInventoryItemDto } from './supplier.dto';
export declare class SupplierService {
    private inventoryRepository;
    private userRepository;
    private productRepository;
    constructor(inventoryRepository: Repository<Inventory>, userRepository: Repository<User>, productRepository: Repository<Product>);
    getSupplierData(supplierId: number): Promise<{
        user: User;
        inventory: {
            product_name: string;
            id: number;
            holder_id: number;
            product_id: number;
            quantity: number;
            unit_price: number;
        }[];
    }>;
    updateInventoryItem(supplierId: number, itemDto: UpdateInventoryItemDto): Promise<Inventory>;
    processInventoryCsv(supplierId: number, csvContent: string): Promise<{
        added: number;
        updated: number;
    }>;
    getAllProducts(): Promise<Product[]>;
}
