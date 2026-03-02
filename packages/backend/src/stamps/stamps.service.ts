import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stamp } from './entities/stamp.entity';
import { StampProduct } from './entities/stamp-product.entity';
import { CardsService } from '../cards/cards.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class StampsService {
  constructor(
    @InjectRepository(Stamp)
    private stampsRepository: Repository<Stamp>,
    @InjectRepository(StampProduct)
    private stampProductsRepository: Repository<StampProduct>,
    private cardsService: CardsService,
    private productsService: ProductsService,
  ) {}

  async create(
    cardId: string,
    awardedBy: string,
    products: { productId: string; quantity: number }[],
    note?: string,
  ): Promise<Stamp> {
    // Validate products array
    if (!products || products.length === 0) {
      throw new BadRequestException('At least one product must be selected');
    }

    // Validate all quantities are positive integers
    for (const product of products) {
      if (!Number.isInteger(product.quantity) || product.quantity <= 0) {
        throw new BadRequestException('Product quantities must be positive integers');
      }
    }

    // Validate that all products exist and are active
    const productIds = products.map((p) => p.productId);
    await this.productsService.validateProducts(productIds);

    // Increment stamp count on card
    await this.cardsService.incrementStamps(cardId);

    // Create stamp
    const stamp = this.stampsRepository.create({
      cardId,
      awardedBy,
      note,
    });
    const savedStamp = await this.stampsRepository.save(stamp);

    // Create stamp-product associations
    const stampProducts = products.map((p) =>
      this.stampProductsRepository.create({
        stampId: savedStamp.id,
        productId: p.productId,
        quantity: p.quantity,
      }),
    );
    await this.stampProductsRepository.save(stampProducts);

    // Return stamp with relations loaded
    return this.stampsRepository.findOne({
      where: { id: savedStamp.id },
      relations: ['stampProducts', 'stampProducts.product'],
    });
  }

  async findByCard(cardId: string): Promise<Stamp[]> {
    return this.stampsRepository.find({
      where: { cardId },
      relations: ['staffMember', 'stampProducts', 'stampProducts.product'],
      order: { awardedAt: 'DESC' },
    });
  }

  async findByStaff(staffId: string): Promise<Stamp[]> {
    return this.stampsRepository.find({
      where: { awardedBy: staffId },
      relations: ['card', 'card.user', 'stampProducts', 'stampProducts.product'],
      order: { awardedAt: 'DESC' },
    });
  }
}
