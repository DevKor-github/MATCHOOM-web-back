import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Studio } from '../studio/entities/studio.entity';
import { Media } from 'src/application/media/entities/media.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Lecture, User, Media]),
    JwtModule.register({})
  ],
  providers: [LectureService],
  controllers: [LectureController]
})
export class LectureModule {}
