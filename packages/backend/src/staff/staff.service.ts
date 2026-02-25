import { Injectable } from '@nestjs/common';
import { QrService } from '../qr/qr.service';
import { CardsService } from '../cards/cards.service';
import { StampsService } from '../stamps/stamps.service';
import { AwardStampResponse } from '@stamp-card/shared';

@Injectable()
export class StaffService {
  constructor(
    private qrService: QrService,
    private cardsService: CardsService,
    private stampsService: StampsService,
  ) {}

  async awardStamp(
    qrCode: string,
    staffId: string,
  ): Promise<AwardStampResponse> {
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

  async getHistory(staffId: string) {
    return this.stampsService.findByStaff(staffId);
  }
}
