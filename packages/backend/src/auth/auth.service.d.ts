import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CardsService } from '../cards/cards.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
export declare class AuthService {
    private usersService;
    private cardsService;
    private jwtService;
    constructor(usersService: UsersService, cardsService: CardsService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        user: Omit<User, "passwordHash" | "hashPassword" | "validatePassword" | "toJSON">;
        accessToken: string;
        refreshToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: Omit<User, "passwordHash" | "hashPassword" | "validatePassword" | "toJSON">;
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private generateTokens;
}
//# sourceMappingURL=auth.service.d.ts.map