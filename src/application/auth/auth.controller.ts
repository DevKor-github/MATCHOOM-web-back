import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SocialLoginReqDto } from './dtos/socialLogin.dto';
import { CookieConfig } from './configs/cookie.config';
import { RegisterReqDto } from './dtos/register.dto';

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
    } else {
      res.cookie('sub', id, CookieConfig.onboardingToken);
    }

    return res.json({ isOnboarding });
  }

  @Post('regiser')
  async register(@Body() registerReqDto: RegisterReqDto, @Req() req: Request, @Res() res: Response) {
    const id = req.cookies['sub'];
    const { accessToken, refreshToken } = await this.authService.register(id, registerReqDto);

    res.clearCookie('sub', CookieConfig.onboardingToken);
    res.cookie('refresh-token', refreshToken, CookieConfig.refreshToken);

    return res.json({ accessToken });
  }

  @Post('refresh-token')
  async renewToken() {
    
  }

  @Post('logout')
  async logout() {

  }
}
