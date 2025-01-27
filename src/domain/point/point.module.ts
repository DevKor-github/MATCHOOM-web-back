import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { User } from '../user/entities/user.entity';
import { Ticket } from '../ticket/entities/ticket.entity';
import { Studio } from '../studio/entities/studio.entity';
import { PointTransaction } from '../point-transaction/entities/point-transaction.entity';
import { PointTransactionService } from '../point-transaction/point-transaction.service';
import { Refund } from './refund.entity';
import { Lecture } from '../lecture/entities/lecture.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Point, User, Ticket, Studio, Lecture, Refund, PointTransaction])
  ],
  providers: [PointService, PointTransactionService],
  controllers: [PointController]
})
export class PointModule {}
