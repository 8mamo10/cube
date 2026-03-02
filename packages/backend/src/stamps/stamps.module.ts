import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stamp } from './entities/stamp.entity';
import { StampProduct } from './entities/stamp-product.entity';
import { StampsService } from './stamps.service';
import { StampsController } from './stamps.controller';
import { CardsModule } from '../cards/cards.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stamp, StampProduct]),
    CardsModule,
    ProductsModule,
  ],
  controllers: [StampsController],
  providers: [StampsService],
  exports: [StampsService],
})
export class StampsModule {}
