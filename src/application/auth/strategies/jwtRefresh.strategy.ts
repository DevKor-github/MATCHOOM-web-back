import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => { return request?.cookies?.refreshToken }
      ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    console.log(payload.sub);
    return { id: payload.sub }
  }
}