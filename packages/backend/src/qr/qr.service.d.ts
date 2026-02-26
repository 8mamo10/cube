import { Repository } from 'typeorm';
import { QRCode } from './entities/qr-code.entity';
export declare class QrService {
    private qrCodeRepository;
    private readonly secret;
    private readonly expirationMinutes;
    constructor(qrCodeRepository: Repository<QRCode>);
    generate(userId: string): Promise<{
        code: string;
        expiresAt: Date;
    }>;
    validate(code: string): Promise<string>;
    deactivate(code: string): Promise<void>;
    private sign;
}
//# sourceMappingURL=qr.service.d.ts.map