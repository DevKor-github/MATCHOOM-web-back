import { Module } from '@nestjs/common';
import { StudioService } from './studio.service';
import { StudioController } from './studio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studio } from './entities/studio.entity';
import { Announcement } from './entities/announcement.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Studio, Announcement, User]),
  ],
  providers: [StudioService],
  controllers: [StudioController]
})
export class StudioModule {}
