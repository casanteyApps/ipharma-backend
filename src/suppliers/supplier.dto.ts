import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString } from 'class-validator';

// We can use a class-validator in a real app, but for simplicity, we'll rely on TS types.
export class UpdateInventoryItemDto {
  @ApiProperty()
  @IsNumberString()
  productId: string;
  @ApiProperty()
  @IsNumber()
  quantity: number;
  @ApiProperty()
  @IsNumber()
  price: number;
}
