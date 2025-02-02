import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Media } from 'src/application/media/entities/media.entity';
import { Point } from '../point/entities/point.entity';
import { PointTransactionService } from '../point-transaction/point-transaction.service';
import { PointTransaction } from '../point-transaction/entities/point-transaction.entity';
import { Studio } from '../studio/entities/studio.entity';
import { Refund } from '../point-transaction/entities/refund.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Lecture, User, Media, Point, PointTransaction, Refund, Studio]),
    JwtModule.register({})
  ],
  providers: [LectureService, PointTransactionService],
  controllers: [LectureController]
})
export class LectureModule {}
