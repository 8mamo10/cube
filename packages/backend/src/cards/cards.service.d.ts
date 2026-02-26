import { Repository } from 'typeorm';
import { StampCard } from './entities/card.entity';
export declare class CardsService {
    private cardsRepository;
    constructor(cardsRepository: Repository<StampCard>);
    create(userId: string, maxStamps?: number): Promise<StampCard>;
    findByUser(userId: string): Promise<StampCard[]>;
    findOne(id: string): Promise<StampCard>;
    findActiveCard(userId: string): Promise<StampCard>;
    incrementStamps(cardId: string): Promise<StampCard>;
}
//# sourceMappingURL=cards.service.d.ts.map