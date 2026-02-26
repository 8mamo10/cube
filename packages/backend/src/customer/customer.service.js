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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const cards_service_1 = require("../cards/cards.service");
const qr_service_1 = require("../qr/qr.service");
let CustomerService = class CustomerService {
    constructor(cardsService, qrService) {
        this.cardsService = cardsService;
        this.qrService = qrService;
    }
    async getCards(userId) {
        return this.cardsService.findByUser(userId);
    }
    async getCard(cardId) {
        return this.cardsService.findOne(cardId);
    }
    async generateQRCode(userId) {
        return this.qrService.generate(userId);
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cards_service_1.CardsService,
        qr_service_1.QrService])
], CustomerService);
//# sourceMappingURL=customer.service.js.map