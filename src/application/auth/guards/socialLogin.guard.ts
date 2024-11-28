import { Injectable } from '@nestjs/common';
import { ExecutionContext, CanActivate } from '@nestjs/common';
import { KakaoStrategy } from '../strategies/kakao.strategy';

@Injectable()
export class SocialLoginGuard implements CanActivate {
  constructor(
    private readonly kakaoLoginStrategy: KakaoStrategy,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const provider = req.body.provider;

    switch (provider) {
      case "kakao":
        await this.kakaoLoginStrategy.authenticate(req);
        return true;
      default:
        throw new Error('지원하지 않는 형식의 로그인 입니다.');
    }
  }
}
