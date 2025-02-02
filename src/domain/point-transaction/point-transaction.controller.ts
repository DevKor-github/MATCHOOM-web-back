import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PointTransactionService } from './point-transaction.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Docs } from './docs/point-transaction.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UserPayload } from 'src/common/interfaces/user.interface';
import { PostRefundReqDto } from './dtos/postRefund.dto';
import { UpdateRefundReqDto } from './dtos/updateRefund.dto';

@Controller(':studioId/point-transaction')
@ApiTags('point-transaction')
export class PointTransactionController {
  constructor(
    private readonly pointTransactionService: PointTransactionService
  ) { }

  @Post('refund')
  @UseGuards(AuthGuard('jwt-access'))
  @Docs('postRefund')
  async postRefund(@Param('studioId') studioId: number, @User() user: UserPayload, @Body() postRefundReqDto: PostRefundReqDto) {
    const userId = user.id;
    const lectureId = postRefundReqDto.lectureId;
    return await this.pointTransactionService.createRefund(studioId, lectureId, userId);
  }

  @Get('refund/unsubmitted')
  @UseGuards(AuthGuard('jwt-access'))
  @Docs('getUnsubmittedRefund')
  async getUnsubmittedRefund(@Param('studioId') studioId: number, @User() user: UserPayload) {
    const userId = user.id;
    return await this.pointTransactionService.getPointTransactions(studioId, userId);
  }

  @Get('refund/submitted')
  @UseGuards(AuthGuard('jwt-access'))
  @Docs('getSubmittedRefund')
  async getSubmittedRefund(@Param('studioId') studioId: number, @User() user: UserPayload) {
    const userId = user.id;
    return await this.pointTransactionService.getSubmittedRefund(studioId, userId);
  }

  @Patch('refund')
  @UseGuards(AuthGuard('jwt-access'))
  @Docs('updateRefund')
  async updateRefund(@Param('studioId') studioId: number, @User() user: UserPayload, @Body() updateRefundReqDto: UpdateRefundReqDto) {
    const userId = user.id;
    return await this.pointTransactionService.updateRefund(userId, studioId, updateRefundReqDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt-access'))
  @Docs('getHistory')
  async getTransactionHistory(@Param('studioId') studioId: number, @User() user: UserPayload) {
    const userId = user.id;
    return await this.pointTransactionService.getHistory(studioId, userId);
  }
}
