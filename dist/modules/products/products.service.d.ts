import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
export declare class ProductsService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    findByCategory(category: string): Promise<Product[]>;
    create(productData: Partial<Product>): Promise<Product>;
    update(id: number, productData: Partial<Product>): Promise<Product>;
    remove(id: number): Promise<void>;
}
