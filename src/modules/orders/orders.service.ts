import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { OrderItem } from '../../entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user', 'orderItems', 'orderItems.product'],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'orderItems', 'orderItems.product'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async create(orderData: Order): Promise<Order> {
    const order = this.orderRepository.create({
      userId: orderData.userId,
      totalAmount: orderData.totalAmount,
      status: orderData.status || 'pending',
      shippingAddress: orderData.shippingAddress,
    });

    const savedOrder = await this.orderRepository.save(order);

    if (orderData.orderItems && orderData.orderItems.length > 0) {
      const orderItems = orderData.orderItems.map((item) =>
        this.orderItemRepository.create({
          orderId: savedOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        }),
      );
      await this.orderItemRepository.save(orderItems);
    }

    return this.findOne(savedOrder.id);
  }

  async update(id: number, orderData: Partial<Order>): Promise<Order> {
    await this.orderRepository.update(id, orderData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
