import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/domain/user/user.service';
import { RegisterReqDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async register(id: number, isOnboarding: boolean, registerReqDto: RegisterReqDto) {
    await this.userService.updateUser(id, registerReqDto);
    const tokens = await this.generateTokens(id, isOnboarding);
    
    return tokens;
  }

  async renewToken(id: number, isOnboarding: boolean) {
    const accessToken = this.generateAccessToken(id, isOnboarding);

    return { accessToken };
  }

  generateAccessToken(id: number, isOnboarding: boolean): string {
    const payload = { sub: id, isOnboarding };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    return accessToken;
  }

  async generateRefreshToken(id: number, isOnboarding: boolean): Promise<string> {
    const payload = { sub: id, isOnboarding };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return refreshToken;
  }

  async generateTokens(id: number, isOnboarding: boolean) {
    const accessToken = this.generateAccessToken(id, isOnboarding);
    const refreshToken = await this.generateRefreshToken(id, isOnboarding);

    return { accessToken, refreshToken };
  }
}
