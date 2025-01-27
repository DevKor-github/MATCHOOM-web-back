import { Module } from '@nestjs/common';
import { PointTransactionService } from './point-transaction.service';
import { PointTransactionController } from './point-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Studio } from '../studio/entities/studio.entity';
import { Lecture } from '../lecture/entities/lecture.entity';
import { Ticket } from '../ticket/entities/ticket.entity';
import { Refund } from './entities/refund.entity';
import { PointTransaction } from './entities/point-transaction.entity';
import { Point } from '../point/entities/point.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Studio, Lecture, Ticket, Refund, Point, PointTransaction]),
  ],
  providers: [PointTransactionService],
  controllers: [PointTransactionController]
})
export class PointTransactionModule { }
