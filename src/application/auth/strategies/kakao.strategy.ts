import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import axios from "axios";
import { Request } from "express";
import { Strategy } from "passport-strategy";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super();
  }

  async authenticate(req: Request) {
    const { code } = req.body;
    try{
      const kakaoToken = await this.getKakaoToken(code);
      console.log(kakaoToken);
      const oauthId = (await this.getKakaoUserInfo(kakaoToken)).toString();
      console.log(oauthId);

      this.success(oauthId);
    } catch (error) {
      this.fail(401);
    }
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

  private async getKakaoUserInfo(kakaoToken: string): Promise<string> {
    const res = await axios.get('https://kapi.kakao.com/v2/user/me', { headers: { Authorization: `Bearer ${kakaoToken}` } });
    if (!res) new UnauthorizedException("소셜 로그인 계정 정보를 불러올 수 없습니다.");

    const id = res.data.id;
    if (!id) throw new NotFoundException("존재하지 않는 소셜 로그인 유저 입니다.");

    return id;
  }
}