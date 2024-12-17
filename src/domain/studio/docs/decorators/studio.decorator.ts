import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PostAnnouncement } from '../../dtos/announcement.dto';

type EndPoints =
  | 'getStudioInfo'
  | 'getStudioAnnouncement'
  | 'postStudioAnnouncement'
  | 'deleteStudioAnnouncement'
  | 'getStudioSearchResult';

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'getStudioInfo':
      return applyDecorators(
        ApiOperation({ summary: '스튜디오 정보 조회' }),
        ApiParam({ name: 'id', type: Number, description: '스튜디오 ID' }),
        ApiResponse({ status: 200, description: '스튜디오 정보 조회 성공' }),
        ApiResponse({ status: 404, description: '스튜디오 정보 조회 실패' }),
      );
    case 'getStudioAnnouncement':
      return applyDecorators(
        ApiOperation({ summary: '스튜디오 공지사항 조회' }),
        ApiParam({ name: 'id', type: Number, description: '스튜디오 ID' }),
        ApiResponse({ status: 200, description: '스튜디오 공지사항 조회 성공' }),
        ApiResponse({ status: 404, description: '스튜디오 공지사항 조회 실패' }),
      );
    case 'postStudioAnnouncement':
      return applyDecorators(
        ApiOperation({ summary: '스튜디오 공지사항 게시' }),
        ApiBody({ type: PostAnnouncement, description: '공지사항 게시 데이터' }),
        ApiBearerAuth('jwt-access'),
        ApiResponse({ status: 201, description: '스튜디오 공지사항 게시 성공' }),
        ApiResponse({ status: 400, description: '스튜디오 공지사항 게시 실패' }),
      );
      case 'deleteStudioAnnouncement':
        return applyDecorators(
          ApiOperation({ summary: '스튜디오 공지사항 삭제' }),
          ApiBody({
            schema: {
              type: 'object',
              properties: {
                id: { type: 'number', description: '삭제할 공지사항 ID' },
              },
              required: ['id'],
            },
          }),
          ApiBearerAuth('jwt-access'),
          ApiResponse({ status: 200, description: '스튜디오 공지사항 삭제 성공' }),
          ApiResponse({ status: 404, description: '스튜디오 공지사항 삭제 실패' }),
        );
      
    case 'getStudioSearchResult':
      return applyDecorators(
        ApiOperation({ summary: '스튜디오 내 강의 검색' }),
        ApiParam({ name: 'id', type: Number, description: '스튜디오 ID' }),
        ApiQuery({ name: 'keyword', type: String, required: false, description: '검색 키워드' }),
        ApiQuery({ name: 'date', type: String, required: false, description: '강의 날짜' }),
        ApiResponse({ status: 200, description: '스튜디오 내 강의 검색 성공' }),
        ApiResponse({ status: 400, description: '스튜디오 내 강의 검색 실패' }),
      );
    default:
      return;
  }
} 