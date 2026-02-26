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
exports.StampsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stamp_entity_1 = require("./entities/stamp.entity");
const cards_service_1 = require("../cards/cards.service");
let StampsService = class StampsService {
    constructor(stampsRepository, cardsService) {
        this.stampsRepository = stampsRepository;
        this.cardsService = cardsService;
    }
    async create(cardId, awardedBy, note) {
        await this.cardsService.incrementStamps(cardId);
        const stamp = this.stampsRepository.create({
            cardId,
            awardedBy,
            note,
        });
        return this.stampsRepository.save(stamp);
    }
    async findByCard(cardId) {
        return this.stampsRepository.find({
            where: { cardId },
            relations: ['staffMember'],
            order: { awardedAt: 'DESC' },
        });
    }
    async findByStaff(staffId) {
        return this.stampsRepository.find({
            where: { awardedBy: staffId },
            relations: ['card', 'card.user'],
            order: { awardedAt: 'DESC' },
        });
    }
};
exports.StampsService = StampsService;
exports.StampsService = StampsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stamp_entity_1.Stamp)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        cards_service_1.CardsService])
], StampsService);
//# sourceMappingURL=stamps.service.js.map