import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SocialLoginReqDto } from './dtos/socialLogin.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('social-login')
  async socialLogin(@Body() socialLoginReqDto: SocialLoginReqDto) {
    const isOnboarding = await this.authService.socialLogin(socialLoginReqDto);

    return isOnboarding;
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
