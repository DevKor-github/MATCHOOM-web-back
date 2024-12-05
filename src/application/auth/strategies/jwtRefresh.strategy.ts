import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Request } from "express";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(

  ) {
    /*
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => { return request?.cookies?.refreshToken }
      ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
    */
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.headers.authorization.split(' ')[1];
    if (!refreshToken) throw new UnauthorizedException("refresh token을 수신하지 못했습니다.");

    const { sub, isOnboarding } = payload;
    if (isOnboarding) throw new UnauthorizedException("회원가입 절차를 완료하지 않은 사용자 입니다.");

    return { id: sub }
  }
}