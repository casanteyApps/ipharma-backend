import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
// import { Product } from '../database/entities/product.entity';
// import { Inventory } from '../database/entities/inventory.entity';
// import { User, UserType, UserStatus } from '../database/entities/user.entity';
// import { Transaction } from '../database/entities/transaction.entity';
import { SourcingRequestDto, PlaceOrderDto } from './customer.dto';
import { Inventory } from '../entities/inventory.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { Transaction } from '../entities/transaction.entity';

export interface SourcingResult extends Inventory {
  name: string;
  total_cost: number;
}

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async getAllProducts() {
    return this.productRepository.find({ order: { name: 'ASC' } });
  }

  async findBestPrices(sourcingDto: SourcingRequestDto) {
    const { productId, quantity } = sourcingDto;
    if (!productId || !quantity || quantity <= 0) {
      throw new BadRequestException('Valid product and quantity are required.');
    }

    // Find all inventory items that match the product and have enough quantity
    const availableInventory = await this.inventoryRepository.find({
      where: {
        product_id: Number(productId),
        quantity: MoreThanOrEqual(quantity),
      },
    });

    if (availableInventory.length === 0) {
      return [];
    }

    // Get the IDs of the suppliers who have the stock
    const supplierIds = availableInventory.map((item) => item.holder_id);

    // Find all active suppliers from that list
    const activeSuppliers = await this.userRepository.find({
      where: supplierIds.map((id) => ({
        id,
        isActive: true,
        role: 'supplier',
      })),
    });
    const activeSupplierMap = new Map(activeSuppliers.map((s) => [s.id, s]));

    // Filter the inventory list to only include items from active suppliers
    const results = availableInventory
      .filter((item) => activeSupplierMap.has(item.holder_id))
      .reduce<SourcingResult[]>((acc, item) => {
        const supplier = activeSupplierMap.get(item.holder_id);
        if (supplier) {
          acc.push({
            ...item,
            name: `${supplier.firstName} ${supplier.lastName}`,
            total_cost: item.unit_price * quantity,
          });
        }
        return acc;
      }, []);

    // Sort by the total cost to find the best price
    return results.sort((a, b) => a.total_cost - b.total_cost);
  }

  async placeOrder(
    buyerId: string,
    orderDto: PlaceOrderDto,
  ): Promise<Transaction> {
    const { sellerId, productId, quantity, totalCost } = orderDto;

    // In a real-world scenario, you would wrap this in a database transaction
    // to ensure both operations succeed or fail together.

    // 1. Decrement the supplier's inventory
    const inventoryItem = await this.inventoryRepository.findOneBy({
      holder_id: Number(sellerId),
      product_id: Number(productId),
    });

    if (!inventoryItem || inventoryItem.quantity < quantity) {
      throw new BadRequestException('Supplier does not have sufficient stock.');
    }

    inventoryItem.quantity -= quantity;
    await this.inventoryRepository.save(inventoryItem);

    // 2. Create a transaction record
    const newTransaction = this.transactionRepository.create({
      buyer_id: buyerId,
      seller_id: String(sellerId),
      product_id: String(productId),
      quantity,
      total_cost: totalCost,
      date: new Date().toISOString(),
    });

    return this.transactionRepository.save(newTransaction);
  }
}
