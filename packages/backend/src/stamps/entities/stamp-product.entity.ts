import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from 'typeorm';
import { Stamp } from './stamp.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('stamp_products')
@Check('"quantity" > 0')
export class StampProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'stamp_id' })
  stampId: string;

  @ManyToOne(() => Stamp, (stamp) => stamp.stampProducts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'stamp_id' })
  stamp: Stamp;

  @Column({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => Product, (product) => product.stampProducts, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'integer' })
  quantity: number;
}
