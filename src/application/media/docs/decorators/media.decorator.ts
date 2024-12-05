import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';

type EndPoints =
  | 'upload'
  | 'getFiles'

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'upload': return applyDecorators(
      ApiOperation({
        description: "파일(이미지) 업로드. 파일과 studioId를 받아 해당 스튜디오에 이미지 저장",
        summary: "파일(이미지) 업로드"
      }),
      ApiBearerAuth(),
      ApiConsumes('multipart/form-data'),
      ApiBody({
        description: "",
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
              description: '이미지 파일.  \npng, jpg, jpeg 형식만 지원합니다.  \n크기는 5mb 미만'
            },
            studioId: { type: 'number', description: '스튜디오 ID', example: '1' },
          },
        },
      }),
      ApiCreatedResponse({
        description: "이미지 업로드 성공"
      }),
      ApiBadRequestResponse({
        description: "허용되지 않은 확장자"
      }),
      ApiUnauthorizedResponse({
        description: "유효하지 않은 access token"
      }),
      ApiNotFoundResponse({
        description: "존재하지 않는 스튜디오"
      })
    );
    case 'getFiles': return applyDecorators(
      ApiOperation({
        description: "파일(이미지) 목록 조회.  [이미지 파일 경로] 최근 저장한 순서로 반환",
        summary: "파일(이미지) 목록 조회"
      }),
      ApiBearerAuth(),
      ApiParam({
        name: "studioId",
        type: Number,
        description: "스튜디오 고유 id"
      }),
      ApiOkResponse({
        description: "파일(이미지) 목록 조회 성공"
      }),
      ApiNotFoundResponse({
        description: "존재하지 않는 스튜디오"
      })
    );
  }
}