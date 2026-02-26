import { StaffService } from './staff.service';
import { User } from '../users/entities/user.entity';
import { AwardStampDto } from './dto/award-stamp.dto';
export declare class StaffController {
    private staffService;
    constructor(staffService: StaffService);
    awardStamp(dto: AwardStampDto, user: User): Promise<import("@stamp-card/shared").AwardStampResponse>;
    getHistory(user: User): Promise<import("../stamps/entities/stamp.entity").Stamp[]>;
}
//# sourceMappingURL=staff.controller.d.ts.map