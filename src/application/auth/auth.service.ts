import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SocialLoginReqDto } from './dtos/socialLogin.dto';
import axios from 'axios';
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

  async socialLogin(socialLoginReqDto: SocialLoginReqDto) {
    const { code, provider } = socialLoginReqDto;
    let oauthId = "";

    switch (provider) {
      case 'kakao':
        const kakaoToken = await this.getKakaoToken(code);
        oauthId = (await this.getKakaoUserInfo(kakaoToken)).toString();
    }
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

  private async getKakaoToken(code: string): Promise<string> {
    const params = {
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_CLIENT_ID,
      redirect_uri: process.env.KAKAO_CALLBACK_URL,
      code: code
    }
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' };
    const res = await axios.post('https://kauth.kakao.com/oauth/token', {}, { params, headers });
    if (!res) throw new BadRequestException('Kakao access token을 가져오는데 실패 했습니다.');

    const kakaoToken = res.data.access_token;
    if (!kakaoToken) throw new UnauthorizedException("Kakao access token을 가져오는데 실패 했습니다.");

    return kakaoToken;
  }

  private async getKakaoUserInfo(kakaoToken): Promise<string> {
    const res = await axios.get('https://kapi.kakao.com/v2/user/me', { headers: { Authorization: `Bearer ${kakaoToken}` } });
    if (!res) new UnauthorizedException("소셜 로그인 계정 정보를 불러올 수 없습니다.");

    const id = res.data.id;
    if (!id) throw new NotFoundException("존재하지 않는 소셜 로그인 유저 입니다.");

    return id;
  }
}
