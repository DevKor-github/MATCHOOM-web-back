import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CookieConfig } from './configs/cookie.config';
import { RegisterReqDto } from './dtos/register.dto';
import { Docs } from './docs/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { SocialLoginGuard } from './guards/socialLogin.guard';
import { UserService } from 'src/domain/user/user.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @Post('social-login')
  @UseGuards(SocialLoginGuard)
  @Docs('social-login')
  async socialLogin(@Res() res: Response, @Req() req: any) {
    const oauthId = req.oauthId;
    const { id, isOnboarding } = await this.userService.getOrCreateUser(oauthId);
    if (!isOnboarding) {
      const refreshToken = await this.authService.generateRefreshToken(id);
      res.cookie('refresh-token', refreshToken, CookieConfig.refreshToken);
    } else {
      res.cookie('sub', id, CookieConfig.onboardingToken);
    }

    return res.json({ isOnboarding });
  }

  @Post('register')
  @Docs('register')
  async register(@Body() registerReqDto: RegisterReqDto, @Req() req: Request, @Res() res: Response) {
    const id = req.cookies['sub'];
    const { accessToken, refreshToken } = await this.authService.register(id, registerReqDto);

    res.clearCookie('sub', CookieConfig.tokenDelete);
    res.cookie('refresh-token', refreshToken, CookieConfig.refreshToken);

    return res.json({ accessToken });
  }

  @Post('refresh-token')
  @UseGuards(AuthGuard('jwt-refresh'))
  @Docs('refresh-token')
  async renewToken(@Req() req: any) {
    const id = req.user.id;
    return await this.authService.renewToken(id);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt-refresh'))
  @Docs('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('refresh-token', CookieConfig.tokenDelete);
    
    return res.send();
  }
}
