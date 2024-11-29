import { applyDecorators } from "@nestjs/common"
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { UpdateUserDto } from "../dtos/updateUser.dto";

type EndPoints =
  | 'update'
  | 'delete'
  | 'getMyInfo'

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'getMyInfo': return applyDecorators(
      
    );
    case 'update': return applyDecorators(
      ApiOperation({
        description: "유저 정보 수정",
        summary: "유저 정보 수정"
      }),
      ApiBody({
        type: UpdateUserDto
      })
    );
    case 'delete': return applyDecorators(

    );
  }
}