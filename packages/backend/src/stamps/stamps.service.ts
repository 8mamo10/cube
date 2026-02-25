import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stamp } from './entities/stamp.entity';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class StampsService {
  constructor(
    @InjectRepository(Stamp)
    private stampsRepository: Repository<Stamp>,
    private cardsService: CardsService,
  ) {}

  async create(cardId: string, awardedBy: string, note?: string): Promise<Stamp> {
    await this.cardsService.incrementStamps(cardId);

    const stamp = this.stampsRepository.create({
      cardId,
      awardedBy,
      note,
    });

    return this.stampsRepository.save(stamp);
  }

  async findByCard(cardId: string): Promise<Stamp[]> {
    return this.stampsRepository.find({
      where: { cardId },
      relations: ['staffMember'],
      order: { awardedAt: 'DESC' },
    });
  }

  async findByStaff(staffId: string): Promise<Stamp[]> {
    return this.stampsRepository.find({
      where: { awardedBy: staffId },
      relations: ['card', 'card.user'],
      order: { awardedAt: 'DESC' },
    });
  }
}
