import { SourcingRequestDto, PlaceOrderDto } from './customer.dto';
import { CustomerService } from './customers.service';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    getAllProducts(): Promise<import("../entities/product.entity").Product[]>;
    findBestPrices(sourcingDto: SourcingRequestDto): Promise<import("./customers.service").SourcingResult[]>;
    placeOrder(body: {
        buyerId: string;
        order: PlaceOrderDto;
    }): Promise<import("../entities/transaction.entity").Transaction>;
}
