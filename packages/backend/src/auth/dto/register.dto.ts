import { IsEmail, IsString, MinLength, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '@stamp-card/shared';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
