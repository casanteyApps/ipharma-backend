import { UpdateInventoryItemDto } from './supplier.dto';
import { SupplierService } from './supplier.service';
export declare class SupplierController {
    private readonly supplierService;
    constructor(supplierService: SupplierService);
    getSupplierData(id: number): Promise<{
        user: import("../entities/user.entity").User;
        inventory: {
            product_name: string;
            id: number;
            holder_id: number;
            product_id: number;
            quantity: number;
            unit_price: number;
        }[];
    }>;
    updateInventoryItem(id: number, itemDto: UpdateInventoryItemDto): Promise<import("../entities/inventory.entity").Inventory>;
    uploadCsv(id: number, file: Express.Multer.File): Promise<{
        added: number;
        updated: number;
    }>;
    getAllProducts(): Promise<import("../entities/product.entity").Product[]>;
}
