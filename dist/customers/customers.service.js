"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventory_entity_1 = require("../entities/inventory.entity");
const product_entity_1 = require("../entities/product.entity");
const user_entity_1 = require("../entities/user.entity");
const transaction_entity_1 = require("../entities/transaction.entity");
let CustomerService = class CustomerService {
    productRepository;
    inventoryRepository;
    userRepository;
    transactionRepository;
    constructor(productRepository, inventoryRepository, userRepository, transactionRepository) {
        this.productRepository = productRepository;
        this.inventoryRepository = inventoryRepository;
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
    }
    async getAllProducts() {
        return this.productRepository.find({ order: { name: 'ASC' } });
    }
    async findBestPrices(sourcingDto) {
        const { productId, quantity } = sourcingDto;
        if (!productId || !quantity || quantity <= 0) {
            throw new common_1.BadRequestException('Valid product and quantity are required.');
        }
        const availableInventory = await this.inventoryRepository.find({
            where: {
                product_id: Number(productId),
                quantity: (0, typeorm_2.MoreThanOrEqual)(quantity),
            },
        });
        if (availableInventory.length === 0) {
            return [];
        }
        const supplierIds = availableInventory.map((item) => item.holder_id);
        const activeSuppliers = await this.userRepository.find({
            where: supplierIds.map((id) => ({
                id,
                isActive: true,
                role: 'supplier',
            })),
        });
        const activeSupplierMap = new Map(activeSuppliers.map((s) => [s.id, s]));
        const results = availableInventory
            .filter((item) => activeSupplierMap.has(item.holder_id))
            .reduce((acc, item) => {
            const supplier = activeSupplierMap.get(item.holder_id);
            if (supplier) {
                acc.push({
                    ...item,
                    name: `${supplier.firstName} ${supplier.lastName}`,
                    total_cost: item.unit_price * quantity,
                });
            }
            return acc;
        }, []);
        return results.sort((a, b) => a.total_cost - b.total_cost);
    }
    async placeOrder(buyerId, orderDto) {
        const { sellerId, productId, quantity, totalCost } = orderDto;
        const inventoryItem = await this.inventoryRepository.findOneBy({
            holder_id: Number(sellerId),
            product_id: Number(productId),
        });
        if (!inventoryItem || inventoryItem.quantity < quantity) {
            throw new common_1.BadRequestException('Supplier does not have sufficient stock.');
        }
        inventoryItem.quantity -= quantity;
        await this.inventoryRepository.save(inventoryItem);
        const newTransaction = this.transactionRepository.create({
            buyer_id: buyerId,
            seller_id: String(sellerId),
            product_id: String(productId),
            quantity,
            total_cost: totalCost,
            date: new Date().toISOString(),
        });
        return this.transactionRepository.save(newTransaction);
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CustomerService);
//# sourceMappingURL=customers.service.js.map