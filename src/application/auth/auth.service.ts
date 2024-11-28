import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/domain/user/user.service';
import { RegisterReqDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async register(id: number, registerReqDto: RegisterReqDto) {
    await this.userService.updateUser(id, registerReqDto);
    const tokens = await this.generateTokens(id);
    
    return tokens;
  }

  async renewToken(id: number) {
    const accessToken = this.generateAccessToken(id);

    return { accessToken };
  } 

  async socialLogin(oauthId: string) {
    const user = await this.userService.getOrCreateUser(oauthId);

    return { id: user.id, isOnboarding: user.isOnboarding };
  }

  generateAccessToken(id: number): string {
    const payload = { sub: id };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    return accessToken;
  }

  async generateRefreshToken(id: number): Promise<string> {
    const payload = { sub: id };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return refreshToken;
  }

  async generateTokens(id: number) {
    const accessToken = this.generateAccessToken(id);
    const refreshToken = await this.generateRefreshToken(id);

    return { accessToken, refreshToken };
  }
}
