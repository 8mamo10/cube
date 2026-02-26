import { Repository } from 'typeorm';
import { Stamp } from './entities/stamp.entity';
import { CardsService } from '../cards/cards.service';
export declare class StampsService {
    private stampsRepository;
    private cardsService;
    constructor(stampsRepository: Repository<Stamp>, cardsService: CardsService);
    create(cardId: string, awardedBy: string, note?: string): Promise<Stamp>;
    findByCard(cardId: string): Promise<Stamp[]>;
    findByStaff(staffId: string): Promise<Stamp[]>;
}
//# sourceMappingURL=stamps.service.d.ts.map