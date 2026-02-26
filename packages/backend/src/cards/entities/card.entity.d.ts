import { CardStatus } from '@stamp-card/shared';
import { User } from '../../users/entities/user.entity';
import { Stamp } from '../../stamps/entities/stamp.entity';
export declare class StampCard {
    id: string;
    userId: string;
    user: User;
    status: CardStatus;
    stampsCount: number;
    maxStamps: number;
    stamps: Stamp[];
    completedAt: Date | null;
    redeemedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=card.entity.d.ts.map