"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const cards_service_1 = require("../cards/cards.service");
const shared_1 = require("../../../shared/src");
let AuthService = class AuthService {
    constructor(usersService, cardsService, jwtService) {
        this.usersService = usersService;
        this.cardsService = cardsService;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const user = await this.usersService.create(registerDto);
        if (user.role === shared_1.UserRole.CUSTOMER) {
            await this.cardsService.create(user.id);
        }
        const tokens = await this.generateTokens(user);
        return {
            user: user.toJSON(),
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
    async login(loginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await user.validatePassword(loginDto.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const tokens = await this.generateTokens(user);
        return {
            user: user.toJSON(),
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
    async refresh(user) {
        const tokens = await this.generateTokens(user);
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
    async generateTokens(user) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET || 'default-jwt-secret',
            expiresIn: process.env.JWT_ACCESS_EXPIRATION || '15m',
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret',
            expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',
        });
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        cards_service_1.CardsService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map