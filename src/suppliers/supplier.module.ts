import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from 'src/entities/inventory.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, User, Product])],
  providers: [SupplierService],
  controllers: [SupplierController],
})
export class SupplierModule {}
