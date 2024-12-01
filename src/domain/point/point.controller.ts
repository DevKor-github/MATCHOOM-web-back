import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PointService } from './point.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';
import { UserPayload } from 'src/common/interfaces/user.interface';
import { Docs } from './docs/point.decorator';

@Controller(':studioId/point')
@ApiTags('point')
export class PointController {
  constructor(
    private readonly pointService: PointService
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt-access'))
  @Docs('getMyPoints')
  async getMyPoints(@Param('studioId') studioId: number, @User() user: UserPayload) {
    const userId = user.id;
    return await this.pointService.getMyPoints(studioId, userId);
  }
}
