import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from 'src/entities/inventory.entity';
import { Product } from 'src/entities/product.entity';
import { Transaction } from 'src/entities/transaction.entity';
import { User } from 'src/entities/user.entity';
import { CustomerService } from './customers.service';
import { CustomerController } from './customers.controller';
// import { Transaction } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Inventory, User, Transaction])],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
