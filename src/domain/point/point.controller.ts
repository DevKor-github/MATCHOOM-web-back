import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PointService } from './point.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';
import { UserPayload } from 'src/common/interfaces/user.interface';
import { Docs } from './docs/point.decorator';
import { PurchasePointReqDto } from './dtos/purchasePoint.dto';

@Controller('point')
@ApiTags('point')
export class PointController {
  constructor(
    private readonly pointService: PointService
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt-access'))
  @Docs('getMyPoints')
  async getMyPoints(@Query('studioId') studioId: number, @User() user: UserPayload) {
    const userId = user.id;
    return await this.pointService.getMyPoints(studioId, userId);
  }

  /*
  @Get('total')
  @UseGuards(AuthGuard('jwt-access'))
  async getTotalPoint(@Param('studioId') studioId: number, @User() user: UserPayload) {

  }
  */

  @Post('purchase')
  @UseGuards(AuthGuard('jwt-access'))
  @Docs('purchase')
  async chargePoint(@Body() purchasePointReqDto: PurchasePointReqDto, @User() user: UserPayload) {
    const userId = user.id;
    const { ticketId, studioId } = purchasePointReqDto;
    return await this.pointService.chargePoint(studioId, userId, ticketId);
  }
}