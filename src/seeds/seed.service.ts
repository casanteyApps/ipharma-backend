import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async seedAll() {
    await this.seedUsers();
    await this.seedProducts();
    await this.seedOrders();
  }

  async seedUsers() {
    const existingUsers = await this.userRepository.count();
    if (existingUsers > 0) return;

    const users = [
      // Admin
      {
        email: 'admin@demo.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      },
      // Customer
      {
        email: 'pharmacy@demo.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'City',
        lastName: 'Pharmacy',
        role: 'customer',
      },
      // Manufacturers
      {
        email: 'manu1@demo.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Pharma',
        lastName: 'Manufacturer 1',
        role: 'supplier',
      },
      {
        email: 'manu2@demo.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Pharma',
        lastName: 'Manufacturer 2',
        role: 'supplier',
      },
      {
        email: 'manu3@demo.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Pharma',
        lastName: 'Manufacturer 3',
        role: 'supplier',
      },
      {
        email: 'manu4@demo.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Pharma',
        lastName: 'Manufacturer 4',
        role: 'supplier',
      },
      {
        email: 'manu5@demo.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Pharma',
        lastName: 'Manufacturer 5',
        role: 'supplier',
      },
      // Distributors
      {
        email: 'dist1@demo.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Pharma',
        lastName: 'Distributor 1',
        role: 'supplier',
      },
      {
        email: 'dist2@demo.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Pharma',
        lastName: 'Distributor 2',
        role: 'supplier',
      },
      {
        email: 'dist3@demo.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Pharma',
        lastName: 'Distributor 3',
        role: 'supplier',
      },
      {
        email: 'dist4@demo.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Pharma',
        lastName: 'Distributor 4',
        role: 'supplier',
      },
      {
        email: 'dist5@demo.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Pharma',
        lastName: 'Distributor 5',
        role: 'supplier',
      },
    ];

    await this.userRepository.save(users);
    console.log('Users seeded successfully');
  }

  async seedProducts() {
    const existingProducts = await this.productRepository.count();
    if (existingProducts > 0) return;

    const products = [
      {
        name: 'Digital Thermometer',
        description:
          'High-precision digital thermometer with quick reading and fever alert.',
        price: 99.99,
        stock: 50,
        category: 'medical',
        imageUrl:
          'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
      },
      {
        name: 'Blood Pressure Monitor',
        description:
          'Automatic blood pressure monitor with large display and memory function.',
        price: 24.99,
        stock: 100,
        category: 'medical',
        imageUrl:
          'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400',
      },
      {
        name: 'First Aid Kit',
        description:
          'Comprehensive first aid kit with essential medical supplies for emergency care.',
        price: 49.99,
        stock: 30,
        category: 'medical',
        imageUrl:
          'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400',
      },
      {
        name: 'Pulse Oximeter',
        description:
          'Fingertip pulse oximeter for measuring blood oxygen levels and pulse rate.',
        price: 34.99,
        stock: 75,
        category: 'medical',
        imageUrl:
          'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
      },
      {
        name: 'Disposable Face Masks',
        description:
          '3-ply disposable face masks with comfortable elastic ear loops.',
        price: 12.99,
        stock: 200,
        category: 'medical',
        imageUrl:
          'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400',
      },
      {
        name: 'Digital Stethoscope',
        description:
          'Professional-grade digital stethoscope with noise reduction technology.',
        price: 79.99,
        stock: 40,
        category: 'medical',
        imageUrl:
          'https://images.unsplash.com/photo-1584715642381-6e7c5846f019?w=400',
      },
    ];

    await this.productRepository.save(products);
    console.log('Products seeded successfully');
  }

  async seedOrders() {
    const existingOrders = await this.orderRepository.count();
    if (existingOrders > 0) return;

    const users = await this.userRepository.find();
    const products = await this.productRepository.find();

    if (users.length === 0 || products.length === 0) return;

    const orders = [
      {
        userId: users[1].id,
        totalAmount: 124.98,
        status: 'completed',
        shippingAddress: '123 Main St, Anytown, USA 12345',
      },
      {
        userId: users[2].id,
        totalAmount: 49.99,
        status: 'pending',
        shippingAddress: '456 Oak Ave, Another City, USA 67890',
      },
    ];

    const savedOrders = await this.orderRepository.save(orders);

    const orderItems = [
      {
        orderId: savedOrders[0].id,
        productId: products[0].id,
        quantity: 1,
        price: 99.99,
      },
      {
        orderId: savedOrders[0].id,
        productId: products[1].id,
        quantity: 1,
        price: 24.99,
      },
      {
        orderId: savedOrders[1].id,
        productId: products[2].id,
        quantity: 1,
        price: 49.99,
      },
    ];

    await this.orderItemRepository.save(orderItems);
    console.log('Orders seeded successfully');
  }
}
