import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { QrModule } from '../qr/qr.module';
import { CardsModule } from '../cards/cards.module';
import { StampsModule } from '../stamps/stamps.module';

@Module({
  imports: [QrModule, CardsModule, StampsModule],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
