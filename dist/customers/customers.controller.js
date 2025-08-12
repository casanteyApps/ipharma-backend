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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const customer_dto_1 = require("./customer.dto");
const customers_service_1 = require("./customers.service");
let CustomerController = class CustomerController {
    customerService;
    constructor(customerService) {
        this.customerService = customerService;
    }
    getAllProducts() {
        return this.customerService.getAllProducts();
    }
    findBestPrices(sourcingDto) {
        return this.customerService.findBestPrices(sourcingDto);
    }
    placeOrder(body) {
        return this.customerService.placeOrder(body.buyerId, body.order);
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Get)('products'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Post)('sourcing'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_dto_1.SourcingRequestDto]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "findBestPrices", null);
__decorate([
    (0, common_1.Post)('order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "placeOrder", null);
exports.CustomerController = CustomerController = __decorate([
    (0, common_1.Controller)('customer'),
    __metadata("design:paramtypes", [customers_service_1.CustomerService])
], CustomerController);
//# sourceMappingURL=customers.controller.js.map