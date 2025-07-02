import { Controller, Get, Post, Body } from '@nestjs/common';
import { SourcingRequestDto, PlaceOrderDto } from './customer.dto';
import { CustomerService } from './customers.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('products')
  getAllProducts() {
    return this.customerService.getAllProducts();
  }

  @Post('sourcing')
  findBestPrices(@Body() sourcingDto: SourcingRequestDto) {
    return this.customerService.findBestPrices(sourcingDto);
  }

  // We'll pass the buyer ID in the body for the demo. In a real app, it would come from auth.
  @Post('order')
  placeOrder(@Body() body: { buyerId: string; order: PlaceOrderDto }) {
    return this.customerService.placeOrder(body.buyerId, body.order);
  }
}
