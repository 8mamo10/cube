import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StampCard } from '../../cards/entities/card.entity';
import { User } from '../../users/entities/user.entity';

@Entity('stamps')
export class Stamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'card_id' })
  cardId: string;

  @ManyToOne(() => StampCard, (card) => card.stamps, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'card_id' })
  card: StampCard;

  @Column({ name: 'awarded_by', nullable: true })
  awardedBy: string | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'awarded_by' })
  staffMember: User | null;

  @CreateDateColumn({ name: 'awarded_at' })
  awardedAt: Date;

  @Column({ nullable: true })
  note: string | null;
}
