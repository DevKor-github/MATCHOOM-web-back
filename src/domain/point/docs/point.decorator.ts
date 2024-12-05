import { applyDecorators } from "@nestjs/common"
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GetPointResDto } from "../dtos/getPoint.dto";

type EndPoints =
  | 'getMyPoints'

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case "getMyPoints": return applyDecorators(
      ApiOperation({
        description: "본인 포인트 조회. 유효한 포인트들을 만료기간 빠른 순으로 [{ 포인트, 만료기간 }] 형식으로 반환",
        summary: "본인 포인트 조회"
      }),
      ApiParam({
        name: "studioId",
        description: "스튜디오 id"
      }),
      ApiParam({
        name: "userId",
        description: "유저 id"
      }),
      ApiOkResponse({
        type: [GetPointResDto]
      }),
      ApiUnauthorizedResponse({
        description: "유효하지 않은 access token 입니다."
      })
    );
  }
}