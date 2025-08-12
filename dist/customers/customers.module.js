"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const inventory_entity_1 = require("../entities/inventory.entity");
const product_entity_1 = require("../entities/product.entity");
const transaction_entity_1 = require("../entities/transaction.entity");
const user_entity_1 = require("../entities/user.entity");
const customers_service_1 = require("./customers.service");
const customers_controller_1 = require("./customers.controller");
let CustomerModule = class CustomerModule {
};
exports.CustomerModule = CustomerModule;
exports.CustomerModule = CustomerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, inventory_entity_1.Inventory, user_entity_1.User, transaction_entity_1.Transaction])],
        providers: [customers_service_1.CustomerService],
        controllers: [customers_controller_1.CustomerController],
    })
], CustomerModule);
//# sourceMappingURL=customers.module.js.map