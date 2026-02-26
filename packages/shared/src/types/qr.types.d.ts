export interface QRCode {
    id: string;
    userId: string;
    code: string;
    expiresAt: Date;
    isActive: boolean;
}
export interface QRCodePayload {
    userId: string;
    timestamp: number;
    nonce: string;
    signature: string;
}
export interface GenerateQRCodeResponse {
    code: string;
    expiresAt: Date;
}
//# sourceMappingURL=qr.types.d.ts.map