import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SocialLoginReqDto } from './dtos/socialLogin.dto';
import { CookieConfig } from './configs/cookie.config';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('social-login')
  async socialLogin(@Body() socialLoginReqDto: SocialLoginReqDto, @Res() res: Response) {
    const { id, isOnboarding } = await this.authService.socialLogin(socialLoginReqDto);
    if (!isOnboarding) {
      const refreshToken = await this.authService.generateRefreshToken(id);
      res.cookie('refresh-token', refreshToken, CookieConfig.refreshToken);
    }

    return res.json({ isOnboarding });
  }

  @Post('regiser')
  async register(@Body() registerReqDto: any) {

  }

  @Post('refresh-token')
  async renewToken() {
    
  }

  @Post('logout')
  async logout() {

  }
}
