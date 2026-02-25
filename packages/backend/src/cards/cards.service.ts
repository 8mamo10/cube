import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StampCard } from './entities/card.entity';
import { CardStatus } from '@stamp-card/shared';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(StampCard)
    private cardsRepository: Repository<StampCard>,
  ) {}

  async create(userId: string, maxStamps: number = 5): Promise<StampCard> {
    const card = this.cardsRepository.create({
      userId,
      maxStamps,
      stampsCount: 0,
      status: CardStatus.ACTIVE,
    });

    return this.cardsRepository.save(card);
  }

  async findByUser(userId: string): Promise<StampCard[]> {
    return this.cardsRepository.find({
      where: { userId },
      relations: ['stamps'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<StampCard> {
    const card = await this.cardsRepository.findOne({
      where: { id },
      relations: ['stamps', 'stamps.staffMember'],
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    return card;
  }

  async findActiveCard(userId: string): Promise<StampCard> {
    let card = await this.cardsRepository.findOne({
      where: { userId, status: CardStatus.ACTIVE },
    });

    if (!card) {
      card = await this.create(userId);
    }

    return card;
  }

  async incrementStamps(cardId: string): Promise<StampCard> {
    const card = await this.findOne(cardId);

    if (card.status !== CardStatus.ACTIVE) {
      throw new BadRequestException('Card is not active');
    }

    if (card.stampsCount >= card.maxStamps) {
      throw new BadRequestException('Card is already full');
    }

    card.stampsCount += 1;

    if (card.stampsCount >= card.maxStamps) {
      card.status = CardStatus.COMPLETED;
      card.completedAt = new Date();
    }

    return this.cardsRepository.save(card);
  }
}
