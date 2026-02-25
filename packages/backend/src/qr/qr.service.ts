import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QRCode } from './entities/qr-code.entity';
import { QRCodePayload } from '@stamp-card/shared';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QrService {
  private readonly secret: string;
  private readonly expirationMinutes: number;

  constructor(
    @InjectRepository(QRCode)
    private qrCodeRepository: Repository<QRCode>,
  ) {
    this.secret = process.env.QR_SECRET || 'default-secret-change-this';
    this.expirationMinutes = parseInt(
      process.env.QR_EXPIRATION_MINUTES || '5',
      10,
    );
  }

  async generate(userId: string): Promise<{ code: string; expiresAt: Date }> {
    const timestamp = Date.now();
    const nonce = uuidv4();
    const expiresAt = new Date(timestamp + this.expirationMinutes * 60 * 1000);

    const payload: Omit<QRCodePayload, 'signature'> = {
      userId,
      timestamp,
      nonce,
    };

    const signature = this.sign(payload);
    const code = JSON.stringify({ ...payload, signature });

    const qrCode = this.qrCodeRepository.create({
      userId,
      code,
      expiresAt,
      isActive: true,
    });

    await this.qrCodeRepository.save(qrCode);

    return { code, expiresAt };
  }

  async validate(code: string): Promise<string> {
    let payload: QRCodePayload;

    try {
      payload = JSON.parse(code);
    } catch {
      throw new UnauthorizedException('Invalid QR code format');
    }

    const { userId, timestamp, nonce, signature } = payload;

    if (!userId || !timestamp || !nonce || !signature) {
      throw new UnauthorizedException('Missing required QR code fields');
    }

    const expectedSignature = this.sign({ userId, timestamp, nonce });
    if (signature !== expectedSignature) {
      throw new UnauthorizedException('Invalid QR code signature');
    }

    const now = Date.now();
    const expirationTime = this.expirationMinutes * 60 * 1000;
    if (now - timestamp > expirationTime) {
      throw new UnauthorizedException('QR code has expired');
    }

    const existingCode = await this.qrCodeRepository.findOne({
      where: { code },
    });

    if (!existingCode || !existingCode.isActive) {
      throw new UnauthorizedException('QR code is invalid or has been used');
    }

    return userId;
  }

  async deactivate(code: string): Promise<void> {
    await this.qrCodeRepository.update({ code }, { isActive: false });
  }

  private sign(payload: Omit<QRCodePayload, 'signature'>): string {
    const data = `${payload.userId}:${payload.timestamp}:${payload.nonce}`;
    return crypto.createHmac('sha256', this.secret).update(data).digest('hex');
  }
}
