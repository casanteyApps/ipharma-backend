import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { UpdateInventoryItemDto } from './supplier.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  // NOTE: In a real app, supplierId would come from an authenticated JWT payload.
  // For this demo, we'll pass it as a parameter.

  async getSupplierData(supplierId: number) {
    const supplier = await this.userRepository.findOneBy({
      id: supplierId,
      role: 'supplier',
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID "${supplierId}" not found`);
    }

    const inventory = await this.inventoryRepository.find({
      where: { holder_id: supplierId },
      order: { product_id: 'ASC' },
    });

    // Join with product names for a better frontend experience
    const products = await this.productRepository.find();
    const productMap = new Map(products.map((p) => [p.id, p.name]));

    const populatedInventory = inventory.map((item) => ({
      ...item,
      product_name: productMap.get(item.product_id) || 'Unknown Product',
    }));

    return {
      user: supplier,
      inventory: populatedInventory,
    };
  }

  async updateInventoryItem(
    supplierId: number,
    itemDto: UpdateInventoryItemDto,
  ): Promise<Inventory> {
    // const { productId, quantity, price } = itemDto;

    let inventoryItem = await this.inventoryRepository.findOne({
      where: {
        holder_id: supplierId,
        product_id: parseInt(itemDto.productId, 10),
      },
    });

    if (inventoryItem) {
      // Update existing item
      inventoryItem.quantity = itemDto.quantity;
      inventoryItem.unit_price = itemDto.price;
    } else {
      // Create new item
      inventoryItem = this.inventoryRepository.create({
        holder_id: supplierId,
        product_id: parseInt(itemDto.productId, 10),
        quantity: itemDto.quantity,
        unit_price: itemDto.price,
      });
    }

    return this.inventoryRepository.save(inventoryItem);
  }

  async processInventoryCsv(
    supplierId: number,
    csvContent: string,
  ): Promise<{ added: number; updated: number }> {
    const lines = csvContent.split('\n').filter((line) => line.trim() !== '');
    // Optional: Remove header if present
    if (lines.length > 0 && isNaN(parseInt(lines[0].split(',')[1], 10))) {
      lines.shift();
    }

    let addedCount = 0;
    let updatedCount = 0;

    for (const line of lines) {
      const [productId, quantityStr, priceStr] = line
        .split(',')
        .map((s) => s.trim());
      const quantity = parseInt(quantityStr, 10);
      const price = parseFloat(priceStr);

      if (!productId || isNaN(quantity) || isNaN(price)) {
        console.warn(`Skipping invalid CSV line: ${line}`);
        continue;
      }

      const existingItem = await this.inventoryRepository.findOne({
        where: { holder_id: supplierId, product_id: parseInt(productId, 10) },
      });

      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.unit_price = price;
        await this.inventoryRepository.save(existingItem);
        updatedCount++;
      } else {
        const newItem = this.inventoryRepository.create({
          holder_id: supplierId,
          product_id: parseInt(productId, 10),
          quantity,
          unit_price: price,
        });
        await this.inventoryRepository.save(newItem);
        addedCount++;
      }
    }

    return { added: addedCount, updated: updatedCount };
  }

  // Add a service method to get all products for the dropdown
  async getAllProducts() {
    return this.productRepository.find({ order: { name: 'ASC' } });
  }
}
