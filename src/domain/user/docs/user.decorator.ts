import { applyDecorators } from "@nestjs/common"
import { ApiBody, ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { UpdateUserReqDto } from "../dtos/updateUser.dto";
import { GetUserResDto } from "../dtos/getUser.dto";

type EndPoints =
  | 'getMyInfo'
  | 'update'
  | 'delete'

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'getMyInfo': return applyDecorators(
      ApiOperation({
        description: "유저 정보 조회(본인)",
        summary: "유저 정보 조회(본인)"
      }),
      ApiOkResponse({
        description: "본인 정보 조회 성공",
        type: GetUserResDto
      })
    );
    case 'update': return applyDecorators(
      ApiOperation({
        description: "유저 정보 수정",
        summary: "유저 정보 수정"
      }),
      ApiBody({
        type: UpdateUserReqDto
      }),
      ApiOkResponse({
        description: "유저 정보 수정 성공"
      }),
      ApiNotFoundResponse({
        description: "존재하지 않는 유저"
      }),
      ApiConflictResponse({
        description: "중복된 전화번호"
      })
    );
    case 'delete': return applyDecorators(
      ApiOperation({
        description: "회원 탈퇴. cookie의 refresh token 삭제, 유저 정보 db에서 삭제",
        summary: "회원 탈퇴"
      }),
      ApiOkResponse({
        description: "회원 탈퇴 성공"
      }),
      ApiNotFoundResponse({
        description: "존재하지 않는 유저"
      })
    );
  }
}