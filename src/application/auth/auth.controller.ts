import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CookieConfig } from './configs/cookie.config';
import { RegisterReqDto } from './dtos/register.dto';
import { Docs } from './decorators/docs/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { SocialLoginGuard } from './guards/socialLogin.guard';
import { UserService } from 'src/domain/user/user.service';
import { Cookie } from './decorators/cookie.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UserPayload } from 'src/common/interfaces/user.interface';

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
    const oauthId = req.user;
    const { id, isOnboarding } = await this.userService.getOrCreateUser(oauthId);
    if (!isOnboarding) {
      const refreshToken = await this.authService.generateRefreshToken(id);
      res.cookie('refreshToken', refreshToken, CookieConfig.refreshToken);
    } else {
      res.cookie('sub', id, CookieConfig.onboardingToken);
    }

    return res.json({ isOnboarding });
  }

  @Post('register')
  @Docs('register')
  async register(@Body() registerReqDto: RegisterReqDto, @Cookie('sub') id: number, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.register(id, registerReqDto);

    res.clearCookie('sub', CookieConfig.tokenDelete);
    res.cookie('refreshToken', refreshToken, CookieConfig.refreshToken);

    return res.json({ accessToken });
  }

  @Post('refresh-token')
  @UseGuards(AuthGuard('jwt-refresh'))
  @Docs('refresh-token')
  async renewToken(@User() user: UserPayload) {
    const id = user.id;
    return await this.authService.renewToken(id);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt-refresh'))
  @Docs('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('refreshToken', CookieConfig.tokenDelete);
    
    return res.send();
  }
}
