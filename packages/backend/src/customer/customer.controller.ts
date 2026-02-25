import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { UserRole } from '@stamp-card/shared';

@Controller('customer')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.CUSTOMER)
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('cards')
  getCards(@CurrentUser() user: User) {
    return this.customerService.getCards(user.id);
  }

  @Get('cards/:id')
  getCard(@Param('id') id: string) {
    return this.customerService.getCard(id);
  }

  @Get('qr-code')
  generateQRCode(@CurrentUser() user: User) {
    return this.customerService.generateQRCode(user.id);
  }
}
