import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { User } from '../user/entities/user.entity';
import { Ticket } from '../ticket/entities/ticket.entity';
import { Studio } from '../studio/entities/studio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Point, User, Ticket, Studio])
  ],
  providers: [PointService],
  controllers: [PointController]
})
export class PointModule {}
