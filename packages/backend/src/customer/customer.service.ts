import { Injectable } from '@nestjs/common';
import { CardsService } from '../cards/cards.service';
import { QrService } from '../qr/qr.service';

@Injectable()
export class CustomerService {
  constructor(
    private cardsService: CardsService,
    private qrService: QrService,
  ) {}

  async getCards(userId: string) {
    return this.cardsService.findByUser(userId);
  }

  async getCard(cardId: string) {
    return this.cardsService.findOne(cardId);
  }

  async generateQRCode(userId: string) {
    return this.qrService.generate(userId);
  }
}
