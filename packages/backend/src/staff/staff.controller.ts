import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { UserRole } from '@stamp-card/shared';
import { AwardStampDto } from './dto/award-stamp.dto';

@Controller('staff')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.STAFF, UserRole.ADMIN)
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Post('award-stamp')
  awardStamp(@Body() dto: AwardStampDto, @CurrentUser() user: User) {
    return this.staffService.awardStamp(dto.qrCode, user.id);
  }

  @Get('history')
  getHistory(@CurrentUser() user: User) {
    return this.staffService.getHistory(user.id);
  }
}
