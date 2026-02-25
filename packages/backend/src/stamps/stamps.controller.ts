import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StampsService } from './stamps.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('stamps')
@UseGuards(JwtAuthGuard)
export class StampsController {
  constructor(private readonly stampsService: StampsService) {}

  @Get('card/:cardId')
  findByCard(@Param('cardId') cardId: string) {
    return this.stampsService.findByCard(cardId);
  }
}
