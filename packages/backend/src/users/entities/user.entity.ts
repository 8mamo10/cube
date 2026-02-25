import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@stamp-card/shared';
import { StampCard } from '../../cards/entities/card.entity';
import { QRCode } from '../../qr/entities/qr-code.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @OneToMany(() => StampCard, (card) => card.user)
  cards: StampCard[];

  @OneToMany(() => QRCode, (qrCode) => qrCode.user)
  qrCodes: QRCode[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.passwordHash) {
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
      this.passwordHash = await bcrypt.hash(this.passwordHash, saltRounds);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }

  toJSON() {
    const { passwordHash, ...user } = this;
    return user;
  }
}
