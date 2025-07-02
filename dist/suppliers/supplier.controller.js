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
exports.SupplierController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const supplier_dto_1 = require("./supplier.dto");
const supplier_service_1 = require("./supplier.service");
const swagger_1 = require("@nestjs/swagger");
let SupplierController = class SupplierController {
    supplierService;
    constructor(supplierService) {
        this.supplierService = supplierService;
    }
    getSupplierData(id) {
        return this.supplierService.getSupplierData(id);
    }
    updateInventoryItem(id, itemDto) {
        try {
            return this.supplierService.updateInventoryItem(id, itemDto);
        }
        catch (error) {
            console.log(`Failed to update inventory item: ${error}`);
            throw new Error(`Failed to update inventory item: ${error}`);
        }
    }
    uploadCsv(id, file) {
        const csvContent = file.buffer.toString();
        return this.supplierService.processInventoryCsv(id, csvContent);
    }
    getAllProducts() {
        return this.supplierService.getAllProducts();
    }
};
exports.SupplierController = SupplierController;
__decorate([
    (0, common_1.Get)(':id/data'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SupplierController.prototype, "getSupplierData", null);
__decorate([
    (0, common_1.Post)(':id/inventory'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, supplier_dto_1.UpdateInventoryItemDto]),
    __metadata("design:returntype", void 0)
], SupplierController.prototype, "updateInventoryItem", null);
__decorate([
    (0, common_1.Post)(':id/inventory/csv'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 100000 }),
            new common_1.FileTypeValidator({ fileType: 'text/csv' }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SupplierController.prototype, "uploadCsv", null);
__decorate([
    (0, common_1.Get)('products'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SupplierController.prototype, "getAllProducts", null);
exports.SupplierController = SupplierController = __decorate([
    (0, common_1.Controller)('supplier'),
    (0, swagger_1.ApiTags)('supplier'),
    __metadata("design:paramtypes", [supplier_service_1.SupplierService])
], SupplierController);
//# sourceMappingURL=supplier.controller.js.map