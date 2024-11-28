import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SocialLoginReqDto, SocialLoginResDto } from '../dtos/socialLogin.dto';

type EndPoints =
  | 'register'
  | 'logout'
  | 'refresh-token'
  | 'social-login';

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'social-login': return applyDecorators(
      ApiOperation({
        description: "소셜 로그인. 인가 코드를 받아서 유저 온보딩 status return",
        summary: "소셜 로그인"
      }),
      ApiBody({
        type: SocialLoginReqDto,
      }),
      ApiCreatedResponse({
        description: "로그인 성공",
        type: SocialLoginResDto
      }),
      ApiUnauthorizedResponse({
        description: "인증되지 않은 사용자"
      }),
      ApiNotFoundResponse({
        description: "존재하지 않는 사용자"
      })
    );
  }
}