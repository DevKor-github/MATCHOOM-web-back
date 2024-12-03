import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RegisterStrategy extends PassportStrategy(Strategy, 'register') {
  constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromExtractors([
          (request) => { return request?.cookies?.refreshToken }
        ]),
        secretOrKey: process.env.JWT_REFRESH_SECRET,
      });
  }

  async validate(payload: JwtPayload) {
    const { sub, isOnboarding } = payload;
    if (!isOnboarding) throw new UnauthorizedException("이미 회원가입 절차를 완료한 사용자 입니다.");

    return { id: sub }
  }
}
