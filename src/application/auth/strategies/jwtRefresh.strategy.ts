import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => { return request?.cookies?.['refresh-token'] }
      ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true
    });
  }

  async validate(payload: JwtPayload) {
    return { id: payload.sub }
  }
}