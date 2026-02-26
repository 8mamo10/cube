import { StampCard } from '../../cards/entities/card.entity';
import { User } from '../../users/entities/user.entity';
export declare class Stamp {
    id: string;
    cardId: string;
    card: StampCard;
    awardedBy: string | null;
    staffMember: User | null;
    awardedAt: Date;
    note: string | null;
}
//# sourceMappingURL=stamp.entity.d.ts.map