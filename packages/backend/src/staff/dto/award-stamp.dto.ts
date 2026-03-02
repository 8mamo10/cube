import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductSelectionDto } from './product-selection.dto';

export class AwardStampDto {
  @IsString()
  @IsNotEmpty()
  qrCode: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one product must be selected' })
  @ValidateNested({ each: true })
  @Type(() => ProductSelectionDto)
  products: ProductSelectionDto[];
}
