import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/domain/user/user.service';
import { User } from 'src/domain/user/entities/user.entity';
import { JwtRefreshStrategy } from './strategies/jwtRefresh.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({})
  ],
  providers: [AuthService, UserService, JwtRefreshStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
