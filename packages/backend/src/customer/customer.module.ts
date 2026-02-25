import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CardsModule } from '../cards/cards.module';
import { QrModule } from '../qr/qr.module';

@Module({
  imports: [CardsModule, QrModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
