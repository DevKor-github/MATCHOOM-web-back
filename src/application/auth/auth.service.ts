import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SocialLoginReqDto } from './dtos/socialLogin.dto';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async socialLogin(socialLoginReqDto: SocialLoginReqDto) {
    const { code, provider } = socialLoginReqDto;
    let oauthId = "";
    
    switch (provider){
      case 'kakao':
        const kakaoToken = await this.getKakaoToken(code);
        oauthId = await this.getKakaoUserInfo(kakaoToken);
    }

    
  }

  private async getKakaoToken(code: string): Promise<string> {
    const params = { 
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_CLIENT_ID, 
      redirect_uri: process.env.KAKAO_CALLBACK_URL,
      code: code
     }
    const res = await axios.post('https://kauth.kakao.com/oauth/token', null, { params });
    if (!res) throw new BadRequestException('Failed to get Kakao access token');
    const kakaoToken = res.data.access_token;

    return kakaoToken;
  }

  private async getKakaoUserInfo(kakaoToken): Promise<string> {
    const res = await axios.get('https://kapi.kakao.com/v2/user/me', { headers: { Authorization: `Bearer ${kakaoToken}` } });
    const id = res.data.id;

    return id;
  }
}
