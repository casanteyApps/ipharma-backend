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
exports.SupplierService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventory_entity_1 = require("../entities/inventory.entity");
const user_entity_1 = require("../entities/user.entity");
const product_entity_1 = require("../entities/product.entity");
let SupplierService = class SupplierService {
    inventoryRepository;
    userRepository;
    productRepository;
    constructor(inventoryRepository, userRepository, productRepository) {
        this.inventoryRepository = inventoryRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }
    async getSupplierData(supplierId) {
        const supplier = await this.userRepository.findOneBy({
            id: supplierId,
            role: 'supplier',
        });
        if (!supplier) {
            throw new common_1.NotFoundException(`Supplier with ID "${supplierId}" not found`);
        }
        const inventory = await this.inventoryRepository.find({
            where: { holder_id: supplierId },
            order: { product_id: 'ASC' },
        });
        const products = await this.productRepository.find();
        const productMap = new Map(products.map((p) => [p.id, p.name]));
        const populatedInventory = inventory.map((item) => ({
            ...item,
            product_name: productMap.get(item.product_id) || 'Unknown Product',
        }));
        return {
            user: supplier,
            inventory: populatedInventory,
        };
    }
    async updateInventoryItem(supplierId, itemDto) {
        let inventoryItem = await this.inventoryRepository.findOne({
            where: {
                holder_id: supplierId,
                product_id: parseInt(itemDto.productId, 10),
            },
        });
        if (inventoryItem) {
            inventoryItem.quantity = itemDto.quantity;
            inventoryItem.unit_price = itemDto.price;
        }
        else {
            inventoryItem = this.inventoryRepository.create({
                holder_id: supplierId,
                product_id: parseInt(itemDto.productId, 10),
                quantity: itemDto.quantity,
                unit_price: itemDto.price,
            });
        }
        return this.inventoryRepository.save(inventoryItem);
    }
    async processInventoryCsv(supplierId, csvContent) {
        const lines = csvContent.split('\n').filter((line) => line.trim() !== '');
        if (lines.length > 0 && isNaN(parseInt(lines[0].split(',')[1], 10))) {
            lines.shift();
        }
        let addedCount = 0;
        let updatedCount = 0;
        for (const line of lines) {
            const [productId, quantityStr, priceStr] = line
                .split(',')
                .map((s) => s.trim());
            const quantity = parseInt(quantityStr, 10);
            const price = parseFloat(priceStr);
            if (!productId || isNaN(quantity) || isNaN(price)) {
                console.warn(`Skipping invalid CSV line: ${line}`);
                continue;
            }
            const existingItem = await this.inventoryRepository.findOne({
                where: { holder_id: supplierId, product_id: parseInt(productId, 10) },
            });
            if (existingItem) {
                existingItem.quantity = quantity;
                existingItem.unit_price = price;
                await this.inventoryRepository.save(existingItem);
                updatedCount++;
            }
            else {
                const newItem = this.inventoryRepository.create({
                    holder_id: supplierId,
                    product_id: parseInt(productId, 10),
                    quantity,
                    unit_price: price,
                });
                await this.inventoryRepository.save(newItem);
                addedCount++;
            }
        }
        return { added: addedCount, updated: updatedCount };
    }
    async getAllProducts() {
        return this.productRepository.find({ order: { name: 'ASC' } });
    }
};
exports.SupplierService = SupplierService;
exports.SupplierService = SupplierService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SupplierService);
//# sourceMappingURL=supplier.service.js.map