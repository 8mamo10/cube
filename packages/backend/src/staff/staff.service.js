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
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const qr_service_1 = require("../qr/qr.service");
const cards_service_1 = require("../cards/cards.service");
const stamps_service_1 = require("../stamps/stamps.service");
let StaffService = class StaffService {
    constructor(qrService, cardsService, stampsService) {
        this.qrService = qrService;
        this.cardsService = cardsService;
        this.stampsService = stampsService;
    }
    async awardStamp(qrCode, staffId) {
        const userId = await this.qrService.validate(qrCode);
        const activeCard = await this.cardsService.findActiveCard(userId);
        const stamp = await this.stampsService.create(activeCard.id, staffId);
        const updatedCard = await this.cardsService.findOne(activeCard.id);
        await this.qrService.deactivate(qrCode);
        const isCompleted = updatedCard.stampsCount >= updatedCard.maxStamps;
        const message = `${updatedCard.stampsCount}/${updatedCard.maxStamps} stamps`;
        return {
            card: {
                id: updatedCard.id,
                status: updatedCard.status,
                stampsCount: updatedCard.stampsCount,
                maxStamps: updatedCard.maxStamps,
            },
            stamp: {
                id: stamp.id,
                awardedAt: stamp.awardedAt,
            },
            message,
            isCompleted,
        };
    }
    async getHistory(staffId) {
        return this.stampsService.findByStaff(staffId);
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [qr_service_1.QrService,
        cards_service_1.CardsService,
        stamps_service_1.StampsService])
], StaffService);
//# sourceMappingURL=staff.service.js.map