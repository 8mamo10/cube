import { CardsService } from './cards.service';
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    findOne(id: string): Promise<import("./entities/card.entity").StampCard>;
}
//# sourceMappingURL=cards.controller.d.ts.map