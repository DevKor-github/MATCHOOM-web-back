import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudioModule } from './domain/studio/studio.module';
import { LectureModule } from './domain/lecture/lecture.module';
import { UserModule } from './domain/user/user.module';
import { AuthModule } from './application/auth/auth.module';
import { S3Module } from './application/s3/s3.module';

@Module({
  imports: [StudioModule, LectureModule, UserModule, AuthModule, S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
