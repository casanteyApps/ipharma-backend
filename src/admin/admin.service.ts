import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
// import { User, UserStatus, UserType } from '../users/entities/user.entity';
// import { Product } from '../products/entities/product.entity';
// import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getDashboardStats() {
    const productCount = await this.productRepository.count();
    const supplierCount = await this.userRepository.count({
      where: { role: 'supplier' },
    });
    const activeCustomerCount = await this.userRepository.count({
      where: { role: 'customer' },
    });

    return {
      products: productCount,
      suppliers: supplierCount,
      activeCustomers: activeCustomerCount,
    };
  }

  async getCustomers(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: 'customer' },
      order: { id: 'ASC' },
    });
  }

  async getSuppliers(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: 'supplier' },
      order: { id: 'ASC' },
    });
  }

  async updateUserStatus(userId: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    user.isActive = !user.isActive;
    await this.userRepository.save(user);
    return user;
  }
}
