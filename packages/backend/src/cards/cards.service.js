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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const card_entity_1 = require("./entities/card.entity");
const shared_1 = require("../../../shared/src");
let CardsService = class CardsService {
    constructor(cardsRepository) {
        this.cardsRepository = cardsRepository;
    }
    async create(userId, maxStamps = 5) {
        const card = this.cardsRepository.create({
            userId,
            maxStamps,
            stampsCount: 0,
            status: shared_1.CardStatus.ACTIVE,
        });
        return this.cardsRepository.save(card);
    }
    async findByUser(userId) {
        return this.cardsRepository.find({
            where: { userId },
            relations: ['stamps'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const card = await this.cardsRepository.findOne({
            where: { id },
            relations: ['stamps', 'stamps.staffMember'],
        });
        if (!card) {
            throw new common_1.NotFoundException('Card not found');
        }
        return card;
    }
    async findActiveCard(userId) {
        let card = await this.cardsRepository.findOne({
            where: { userId, status: shared_1.CardStatus.ACTIVE },
        });
        if (!card) {
            card = await this.create(userId);
        }
        return card;
    }
    async incrementStamps(cardId) {
        const card = await this.findOne(cardId);
        if (card.status !== shared_1.CardStatus.ACTIVE) {
            throw new common_1.BadRequestException('Card is not active');
        }
        if (card.stampsCount >= card.maxStamps) {
            throw new common_1.BadRequestException('Card is already full');
        }
        card.stampsCount += 1;
        if (card.stampsCount >= card.maxStamps) {
            card.status = shared_1.CardStatus.COMPLETED;
            card.completedAt = new Date();
        }
        return this.cardsRepository.save(card);
    }
};
exports.CardsService = CardsService;
exports.CardsService = CardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(card_entity_1.StampCard)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CardsService);
//# sourceMappingURL=cards.service.js.map