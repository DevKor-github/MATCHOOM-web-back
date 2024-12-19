import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Media } from 'src/application/media/entities/media.entity';
import { Point } from '../point/entities/point.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Lecture, User, Media, Point]),
    JwtModule.register({})
  ],
  providers: [LectureService],
  controllers: [LectureController]
})
export class LectureModule {}
