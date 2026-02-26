import { Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
declare const RefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshStrategy extends RefreshStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(payload: {
        sub: string;
        email: string;
    }): Promise<import("../../users/entities/user.entity").User>;
}
export {};
//# sourceMappingURL=refresh.strategy.d.ts.map