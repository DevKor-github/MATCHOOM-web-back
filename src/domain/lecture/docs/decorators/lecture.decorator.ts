import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateLectureDto, DeleteLectureDto, LectureApplyDto } from '../../dtos/lecture.dto';

type EndPoints =
  | 'getLectureInfo'
  | 'applyLecture'
  | 'createLecture'
  | 'deleteLecture';

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'getLectureInfo':
      return applyDecorators(
        ApiOperation({ summary: '강의 정보 조회' }),
        ApiParam({ name: 'id', type: Number, description: '강의 ID' }),
        ApiResponse({ status: 200, description: '강의 정보 조회 성공' }),
      );
    case 'applyLecture':
      return applyDecorators(
        ApiOperation({ summary: '강의 신청' }),
        ApiBody({ type: LectureApplyDto, description: '강의 신청 데이터' }),
        ApiBearerAuth('jwt-access'),
        ApiResponse({ status: 201, description: '강의 신청 성공' }),
      );
    case 'createLecture':
      return applyDecorators(
        ApiOperation({ summary: '강의 생성' }),
        ApiBody({ type: CreateLectureDto, description: '강의 생성 데이터' }),
        ApiBearerAuth('jwt-access'),
        ApiResponse({ status: 201, description: '강의 생성 성공' }),
      );
    case 'deleteLecture':
      return applyDecorators(
        ApiOperation({ summary: '강의 삭제' }),
        ApiBody({ type: DeleteLectureDto, description: '강의 삭제 데이터', required: true }),
        ApiBearerAuth('jwt-access'),
        ApiResponse({ status: 200, description: '강의 삭제 성공' }),
      );
    default:
      return;
  }
} 