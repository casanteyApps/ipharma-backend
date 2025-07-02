import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateInventoryItemDto } from './supplier.dto';
import { SupplierService } from './supplier.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('supplier')
@ApiTags('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get(':id/data')
  getSupplierData(@Param('id') id: number) {
    return this.supplierService.getSupplierData(id);
  }

  @Post(':id/inventory')
  updateInventoryItem(
    @Param('id') id: number,
    @Body() itemDto: UpdateInventoryItemDto,
  ) {
    try {
      return this.supplierService.updateInventoryItem(id, itemDto);
    } catch (error) {
      console.log(`Failed to update inventory item: ${error}`);
      throw new Error(`Failed to update inventory item: ${error}`);
    }
    // return this.supplierService.updateInventoryItem(id, itemDto);
  }

  @Post(':id/inventory/csv')
  @UseInterceptors(FileInterceptor('file'))
  uploadCsv(
    @Param('id') id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }), // 100kb
          new FileTypeValidator({ fileType: 'text/csv' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const csvContent = file.buffer.toString();
    return this.supplierService.processInventoryCsv(id, csvContent);
  }

  // Endpoint to populate the product dropdown on the frontend
  @Get('products')
  getAllProducts() {
    return this.supplierService.getAllProducts();
  }
}
