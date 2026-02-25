import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Check,
} from 'typeorm';
import { CardStatus } from '@stamp-card/shared';
import { User } from '../../users/entities/user.entity';
import { Stamp } from '../../stamps/entities/stamp.entity';

@Entity('stamp_cards')
@Check('"stamps_count" >= 0 AND "stamps_count" <= "max_stamps"')
export class StampCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.cards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: CardStatus,
    default: CardStatus.ACTIVE,
  })
  status: CardStatus;

  @Column({ name: 'stamps_count', default: 0 })
  stampsCount: number;

  @Column({ name: 'max_stamps', default: 5 })
  maxStamps: number;

  @OneToMany(() => Stamp, (stamp) => stamp.card)
  stamps: Stamp[];

  @Column({ name: 'completed_at', nullable: true })
  completedAt: Date | null;

  @Column({ name: 'redeemed_at', nullable: true })
  redeemedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
