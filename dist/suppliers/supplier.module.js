"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const inventory_entity_1 = require("../entities/inventory.entity");
const product_entity_1 = require("../entities/product.entity");
const user_entity_1 = require("../entities/user.entity");
const supplier_controller_1 = require("./supplier.controller");
const supplier_service_1 = require("./supplier.service");
let SupplierModule = class SupplierModule {
};
exports.SupplierModule = SupplierModule;
exports.SupplierModule = SupplierModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([inventory_entity_1.Inventory, user_entity_1.User, product_entity_1.Product])],
        providers: [supplier_service_1.SupplierService],
        controllers: [supplier_controller_1.SupplierController],
    })
], SupplierModule);
//# sourceMappingURL=supplier.module.js.map