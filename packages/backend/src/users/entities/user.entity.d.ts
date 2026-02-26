import { UserRole } from '@stamp-card/shared';
import { StampCard } from '../../cards/entities/card.entity';
import { QRCode } from '../../qr/entities/qr-code.entity';
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    cards: StampCard[];
    qrCodes: QRCode[];
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    toJSON(): Omit<this, "passwordHash" | "hashPassword" | "validatePassword" | "toJSON">;
}
//# sourceMappingURL=user.entity.d.ts.map