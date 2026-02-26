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
exports.Stamp = void 0;
const typeorm_1 = require("typeorm");
const card_entity_1 = require("../../cards/entities/card.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Stamp = class Stamp {
};
exports.Stamp = Stamp;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Stamp.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'card_id' }),
    __metadata("design:type", String)
], Stamp.prototype, "cardId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => card_entity_1.StampCard, (card) => card.stamps, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'card_id' }),
    __metadata("design:type", card_entity_1.StampCard)
], Stamp.prototype, "card", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'awarded_by', nullable: true }),
    __metadata("design:type", Object)
], Stamp.prototype, "awardedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'awarded_by' }),
    __metadata("design:type", Object)
], Stamp.prototype, "staffMember", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'awarded_at' }),
    __metadata("design:type", Date)
], Stamp.prototype, "awardedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Stamp.prototype, "note", void 0);
exports.Stamp = Stamp = __decorate([
    (0, typeorm_1.Entity)('stamps')
], Stamp);
//# sourceMappingURL=stamp.entity.js.map