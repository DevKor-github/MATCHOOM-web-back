import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/domain/user/user.service';
import { User } from 'src/domain/user/entities/user.entity';
import { JwtRefreshStrategy } from './strategies/jwtRefresh.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { SocialLoginGuard } from './guards/socialLogin.guard';
import { JwtAccessStrategy } from './strategies/jwtAccess.strategy';
import { RegisterStrategy } from './strategies/onboarding.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({})
  ],
  providers: [AuthService, UserService, JwtRefreshStrategy, JwtAccessStrategy, KakaoStrategy, RegisterStrategy, SocialLoginGuard],
  controllers: [AuthController]
})
export class AuthModule {}
