import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { Order } from '../../entities/order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new order' })
  create(@Body() createOrderDto: any): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update order' })
  update(@Param('id') id: string, @Body() updateOrderDto: Partial<Order>): Promise<Order> {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order' })
  remove(@Param('id') id: string): Promise<void> {
    return this.ordersService.remove(+id);
  }
}
