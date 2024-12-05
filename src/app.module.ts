import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppService } from './app.service';
import { StudioModule } from './domain/studio/studio.module';
import { LectureModule } from './domain/lecture/lecture.module';
import { UserModule } from './domain/user/user.module';
import { AuthModule } from './application/auth/auth.module';
import { MediaModule } from './application/media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }
    }),
    StudioModule, LectureModule, UserModule, AuthModule, MediaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
