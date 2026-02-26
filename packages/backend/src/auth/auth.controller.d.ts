import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(loginDto: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(res: Response): Response<any, Record<string, any>>;
    refresh(user: User, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(user: User): Omit<User, "passwordHash" | "hashPassword" | "validatePassword" | "toJSON">;
}
//# sourceMappingURL=auth.controller.d.ts.map