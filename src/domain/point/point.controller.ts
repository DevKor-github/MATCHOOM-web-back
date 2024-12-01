import { Controller, Get, Param } from '@nestjs/common';
import { PointService } from './point.service';
import { ApiTags } from '@nestjs/swagger';

@Controller(':studioId/point')
@ApiTags('point')
export class PointController {
  constructor(
    private readonly pointService: PointService
  ) { }

  @Get()
  async getMyPoints(@Param('studioId') studioId: number) {
    
  }
}
