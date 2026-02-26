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
exports.StampCard = void 0;
const typeorm_1 = require("typeorm");
const shared_1 = require("../../../../shared/src");
const user_entity_1 = require("../../users/entities/user.entity");
const stamp_entity_1 = require("../../stamps/entities/stamp.entity");
let StampCard = class StampCard {
};
exports.StampCard = StampCard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StampCard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], StampCard.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.cards, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], StampCard.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: shared_1.CardStatus,
        default: shared_1.CardStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], StampCard.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stamps_count', default: 0 }),
    __metadata("design:type", Number)
], StampCard.prototype, "stampsCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_stamps', default: 5 }),
    __metadata("design:type", Number)
], StampCard.prototype, "maxStamps", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stamp_entity_1.Stamp, (stamp) => stamp.card),
    __metadata("design:type", Array)
], StampCard.prototype, "stamps", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completed_at', nullable: true }),
    __metadata("design:type", Object)
], StampCard.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'redeemed_at', nullable: true }),
    __metadata("design:type", Object)
], StampCard.prototype, "redeemedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StampCard.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], StampCard.prototype, "updatedAt", void 0);
exports.StampCard = StampCard = __decorate([
    (0, typeorm_1.Entity)('stamp_cards'),
    (0, typeorm_1.Check)('"stamps_count" >= 0 AND "stamps_count" <= "max_stamps"')
], StampCard);
//# sourceMappingURL=card.entity.js.map