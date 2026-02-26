import { StampsService } from './stamps.service';
export declare class StampsController {
    private readonly stampsService;
    constructor(stampsService: StampsService);
    findByCard(cardId: string): Promise<import("./entities/stamp.entity").Stamp[]>;
}
//# sourceMappingURL=stamps.controller.d.ts.map