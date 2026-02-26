import { QrService } from '../qr/qr.service';
import { CardsService } from '../cards/cards.service';
import { StampsService } from '../stamps/stamps.service';
import { AwardStampResponse } from '@stamp-card/shared';
export declare class StaffService {
    private qrService;
    private cardsService;
    private stampsService;
    constructor(qrService: QrService, cardsService: CardsService, stampsService: StampsService);
    awardStamp(qrCode: string, staffId: string): Promise<AwardStampResponse>;
    getHistory(staffId: string): Promise<import("../stamps/entities/stamp.entity").Stamp[]>;
}
//# sourceMappingURL=staff.service.d.ts.map