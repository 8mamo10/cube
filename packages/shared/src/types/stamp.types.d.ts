export interface AwardStampDto {
    qrCode: string;
}
export interface AwardStampResponse {
    card: {
        id: string;
        status: string;
        stampsCount: number;
        maxStamps: number;
    };
    stamp: {
        id: string;
        awardedAt: Date;
    };
    message: string;
    isCompleted: boolean;
}
//# sourceMappingURL=stamp.types.d.ts.map