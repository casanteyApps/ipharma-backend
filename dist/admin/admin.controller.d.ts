import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboardStats(): Promise<{
        products: number;
        suppliers: number;
        activeCustomers: number;
    }>;
    getCustomers(): Promise<import("../entities/user.entity").User[]>;
    getSuppliers(): Promise<import("../entities/user.entity").User[]>;
    updateUserStatus(id: number): Promise<import("../entities/user.entity").User>;
}
