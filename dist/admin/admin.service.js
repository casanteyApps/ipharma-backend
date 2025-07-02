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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../entities/product.entity");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
let AdminService = class AdminService {
    userRepository;
    productRepository;
    constructor(userRepository, productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }
    async getDashboardStats() {
        const productCount = await this.productRepository.count();
        const supplierCount = await this.userRepository.count({
            where: { role: 'supplier' },
        });
        const activeCustomerCount = await this.userRepository.count({
            where: { role: 'customer' },
        });
        return {
            products: productCount,
            suppliers: supplierCount,
            activeCustomers: activeCustomerCount,
        };
    }
    async getCustomers() {
        return this.userRepository.find({
            where: { role: 'customer' },
            order: { id: 'ASC' },
        });
    }
    async getSuppliers() {
        return this.userRepository.find({
            where: { role: 'supplier' },
            order: { id: 'ASC' },
        });
    }
    async updateUserStatus(userId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID "${userId}" not found`);
        }
        user.isActive = !user.isActive;
        await this.userRepository.save(user);
        return user;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map