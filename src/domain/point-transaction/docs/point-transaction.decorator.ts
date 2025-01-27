import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { PostRefundReqDto } from "../dtos/postRefund.dto";
import { UpdateRefundReqDto } from "../dtos/updateRefund.dto";
import { GetHistoryResDto } from "../dtos/getHistory.dto";

type EndPoints =
  | 'postRefund'
  | 'getRefund'
  | 'updateRefund'
  | 'getHistory';

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'postRefund': return applyDecorators(
      ApiOperation({
        description: "환불 신청.",
        summary: "환불 신청"
      }),
      ApiBearerAuth(),
      ApiParam({
        name: "studioId",
        description: "스튜디오 id"
      }),
      ApiBody({
        type: PostRefundReqDto
      }),
      ApiOkResponse({
        description: "환불 신청 성공"
      }),
      ApiUnauthorizedResponse({
        description: "유효하지 않은 access token"
      })
    );
    case 'getRefund': return applyDecorators(
      ApiOperation({
        description: "환불 신청 목록 조회",
        summary: "환불 신청 목록 조회"
      }),
      ApiBearerAuth(),
      ApiParam({
        name: "studioId",
        description: "스튜디오 id"
      }),
      ApiOkResponse({
        description: "환불 신청 목록 조회 성공"
      }),
      ApiUnauthorizedResponse({
        description: "유효하지 않은 access token"
      })
    );
    case 'updateRefund': return applyDecorators(
      ApiOperation({
        description: "환불 상태 수정",
        summary: "환불 상태 수정"
      }),
      ApiBearerAuth(),
      ApiParam({
        name: "studioId",
        description: "스튜디오 id"
      }),
      ApiBody({
        type: UpdateRefundReqDto
      }),
      ApiOkResponse({
        description: "환불 상태 수정 성공"
      }),
      ApiUnauthorizedResponse({
        description: "유효하지 않은 access token"
      })
    );
    case 'getHistory': return applyDecorators(
      ApiOperation({
        description: "거래 내역 조회.  \ntype: purchase ==> 강의 구매  \ntype: charge ==> 포인트 충전",
        summary: "거래 내역 조회"
      }),
      ApiBearerAuth(),
      ApiParam({
        name: "studioId",
        description: "스튜디오 id"
      }),
      ApiOkResponse({
        type: GetHistoryResDto,
        description: "거래 내역 조회 성공"
      }),
      ApiUnauthorizedResponse({
        description: "유효하지 않은 access token"
      })
    );
  }
}