import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

// We can use class-validator in a real app
export class SourcingRequestDto {
  @ApiProperty()
  @IsNumberString()
  productId: string;
  @ApiProperty()
  @IsNumberString()
  quantity: number;
}

export class PlaceOrderDto {
  @ApiProperty()
  sellerId: string;
  @ApiProperty()
  productId: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  totalCost: number;
}
