import { IsString, IsNotEmpty } from 'class-validator';

export class AwardStampDto {
  @IsString()
  @IsNotEmpty()
  qrCode: string;
}
