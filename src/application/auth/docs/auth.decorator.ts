import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SocialLoginReqDto, SocialLoginResDto } from '../dtos/socialLogin.dto';
import { RegisterReqDto, RegisterResDto } from '../dtos/register.dto';

type EndPoints =
  | 'register'
  | 'logout'
  | 'refresh-token'
  | 'social-login';

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'social-login': return applyDecorators(
      ApiOperation({
        description: "소셜 로그인. 인가 코드를 받아서 유저 온보딩 status(isOnboarding) 반환",
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
    case 'register': return applyDecorators(
      ApiOperation({
        description: "회원가입. 입력 정보들을 받아 회원가입. 완료 시 access token 반환",
        summary: "회원가입"
      }),
      ApiBody({
        type: RegisterReqDto
      }),
      ApiCreatedResponse({
        description: "회원가입 완료",
        type: RegisterResDto
      }),
      ApiConflictResponse({
        description: "중복된 전화번호입니다."
      }),
      ApiNotFoundResponse({
        description: "존재하지 않는 사용자입니다."
      })
    )
  }
}