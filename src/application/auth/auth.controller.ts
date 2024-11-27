import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('social-login')
  async socialLogin() {

  }

  @Post('regiser')
  async register(@Body() registerRequestDto: any) {

  }

  @Post('refresh-token')
  async renewToken() {
    
  }

  @Post('logout')
  async logout() {

  }
}
