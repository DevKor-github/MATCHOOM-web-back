import { applyDecorators } from "@nestjs/common"
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GetPointResDto } from "../dtos/getPoint.dto";
import { PurchasePointReqDto } from "../dtos/purchasePoint.dto";

type EndPoints =
  | 'getMyPoints'
  | 'purchase'

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case "getMyPoints": return applyDecorators(
      ApiOperation({
        description: "본인 포인트 조회. 유효한 포인트들을 만료기간 빠른 순으로 [{ 포인트, 만료기간 }] 형식으로 반환",
        summary: "본인 포인트 조회"
      }),
      ApiBearerAuth(),
      ApiParam({
        name: "studioId",
        description: "스튜디오 id"
      }),
      ApiOkResponse({
        type: [GetPointResDto]
      }),
      ApiUnauthorizedResponse({
        description: "유효하지 않은 access token 입니다."
      })
    );
    case "purchase": return applyDecorators(
      ApiOperation({
        description: "포인트 구매. ",
        summary: "포인트 구매"
      }),
      ApiBearerAuth(),
      ApiCreatedResponse({
        description: "포인트 구매 성공"
      }),
      ApiParam({
        name: "studioId",
        description: "스튜디오 id"
      }),
      ApiBody({
        type: PurchasePointReqDto
      }),
      ApiUnauthorizedResponse({
        description: "유효하지 않은 access token 입니다."
      }),
      ApiNotFoundResponse({
        description: "존재하지 않는 유저/스튜디오/티켓"
      })
    );
  }
}