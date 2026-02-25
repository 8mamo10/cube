import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QRCode } from './entities/qr-code.entity';
import { QrService } from './qr.service';

@Module({
  imports: [TypeOrmModule.forFeature([QRCode])],
  providers: [QrService],
  exports: [QrService],
})
export class QrModule {}
