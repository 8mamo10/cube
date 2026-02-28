import { IsEmail, IsString, MinLength, IsEnum, IsNotEmpty, ValidateIf } from 'class-validator';
import { UserRole, Gender, AgeRange } from '@stamp-card/shared';

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

  @ValidateIf(o => o.role === UserRole.CUSTOMER)
  @IsEnum(Gender)
  @IsNotEmpty()
  gender?: Gender;

  @ValidateIf(o => o.role === UserRole.CUSTOMER)
  @IsEnum(AgeRange)
  @IsNotEmpty()
  ageRange?: AgeRange;
}
