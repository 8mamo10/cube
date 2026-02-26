export declare enum CardStatus {
    ACTIVE = "active",
    COMPLETED = "completed",
    REDEEMED = "redeemed"
}
export interface StampCard {
    id: string;
    userId: string;
    status: CardStatus;
    stampsCount: number;
    maxStamps: number;
    completedAt?: Date;
    redeemedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateCardDto {
    userId: string;
    maxStamps?: number;
}
export interface CardWithStamps extends StampCard {
    stamps: Stamp[];
}
export interface Stamp {
    id: string;
    cardId: string;
    awardedBy?: string;
    awardedAt: Date;
    note?: string;
}
export interface CreateStampDto {
    cardId: string;
    awardedBy: string;
    note?: string;
}
//# sourceMappingURL=card.types.d.ts.map