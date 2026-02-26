import { CustomerService } from './customer.service';
import { User } from '../users/entities/user.entity';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    getCards(user: User): Promise<import("../cards/entities/card.entity").StampCard[]>;
    getCard(id: string): Promise<import("../cards/entities/card.entity").StampCard>;
    generateQRCode(user: User): Promise<{
        code: string;
        expiresAt: Date;
    }>;
}
//# sourceMappingURL=customer.controller.d.ts.map