import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

class SocialLoginReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "123456789" })
  code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "kakao" })
  provider: string;
}

class SocialLoginResDto {
  @ApiProperty({ example: "xxxx.xxxx.xxxx" })
  refreshToken: string;

  @ApiProperty({ example: "xxxx.xxxx.xxxx" })
  accessToken: string;

  @ApiProperty({ example: false })
  isOnboarding: boolean;
}

export { SocialLoginReqDto, SocialLoginResDto }
