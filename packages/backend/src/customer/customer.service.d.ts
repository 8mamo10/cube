import { CardsService } from '../cards/cards.service';
import { QrService } from '../qr/qr.service';
export declare class CustomerService {
    private cardsService;
    private qrService;
    constructor(cardsService: CardsService, qrService: QrService);
    getCards(userId: string): Promise<import("../cards/entities/card.entity").StampCard[]>;
    getCard(cardId: string): Promise<import("../cards/entities/card.entity").StampCard>;
    generateQRCode(userId: string): Promise<{
        code: string;
        expiresAt: Date;
    }>;
}
//# sourceMappingURL=customer.service.d.ts.map