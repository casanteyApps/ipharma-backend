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
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const product_entity_1 = require("../entities/product.entity");
const order_entity_1 = require("../entities/order.entity");
const order_item_entity_1 = require("../entities/order-item.entity");
const bcrypt = require("bcryptjs");
let SeedService = class SeedService {
    userRepository;
    productRepository;
    orderRepository;
    orderItemRepository;
    constructor(userRepository, productRepository, orderRepository, orderItemRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }
    async seedAll() {
        await this.seedUsers();
        await this.seedProducts();
        await this.seedOrders();
    }
    async seedUsers() {
        const existingUsers = await this.userRepository.count();
        if (existingUsers > 0)
            return;
        const users = [
            {
                email: 'admin@example.com',
                password: await bcrypt.hash('admin123', 10),
                firstName: 'Admin',
                lastName: 'User',
                role: 'admin',
            },
            {
                email: 'john.doe@example.com',
                password: await bcrypt.hash('user123', 10),
                firstName: 'John',
                lastName: 'Doe',
                role: 'user',
            },
            {
                email: 'jane.smith@example.com',
                password: await bcrypt.hash('user123', 10),
                firstName: 'Jane',
                lastName: 'Smith',
                role: 'user',
            },
        ];
        await this.userRepository.save(users);
        console.log('Users seeded successfully');
    }
    async seedProducts() {
        const existingProducts = await this.productRepository.count();
        if (existingProducts > 0)
            return;
        const products = [
            {
                name: 'Wireless Bluetooth Headphones',
                description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
                price: 99.99,
                stock: 50,
                category: 'electronics',
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
            },
            {
                name: 'Smartphone Case',
                description: 'Durable and stylish smartphone case with drop protection and wireless charging compatibility.',
                price: 24.99,
                stock: 100,
                category: 'accessories',
                imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400',
            },
            {
                name: 'Laptop Stand',
                description: 'Ergonomic aluminum laptop stand with adjustable height and angle.',
                price: 49.99,
                stock: 30,
                category: 'accessories',
                imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
            },
            {
                name: 'Wireless Mouse',
                description: 'Precision wireless mouse with ergonomic design and long battery life.',
                price: 34.99,
                stock: 75,
                category: 'electronics',
                imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
            },
            {
                name: 'USB-C Cable',
                description: 'Fast charging USB-C cable with data transfer capabilities.',
                price: 12.99,
                stock: 200,
                category: 'accessories',
                imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
            },
            {
                name: 'Portable Speaker',
                description: 'Compact Bluetooth speaker with waterproof design and excellent sound quality.',
                price: 79.99,
                stock: 40,
                category: 'electronics',
                imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
            },
        ];
        await this.productRepository.save(products);
        console.log('Products seeded successfully');
    }
    async seedOrders() {
        const existingOrders = await this.orderRepository.count();
        if (existingOrders > 0)
            return;
        const users = await this.userRepository.find();
        const products = await this.productRepository.find();
        if (users.length === 0 || products.length === 0)
            return;
        const orders = [
            {
                userId: users[1].id,
                totalAmount: 124.98,
                status: 'completed',
                shippingAddress: '123 Main St, Anytown, USA 12345',
            },
            {
                userId: users[2].id,
                totalAmount: 49.99,
                status: 'pending',
                shippingAddress: '456 Oak Ave, Another City, USA 67890',
            },
        ];
        const savedOrders = await this.orderRepository.save(orders);
        const orderItems = [
            {
                orderId: savedOrders[0].id,
                productId: products[0].id,
                quantity: 1,
                price: 99.99,
            },
            {
                orderId: savedOrders[0].id,
                productId: products[1].id,
                quantity: 1,
                price: 24.99,
            },
            {
                orderId: savedOrders[1].id,
                productId: products[2].id,
                quantity: 1,
                price: 49.99,
            },
        ];
        await this.orderItemRepository.save(orderItems);
        console.log('Orders seeded successfully');
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(3, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map