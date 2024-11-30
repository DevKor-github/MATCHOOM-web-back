import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { GetTicketResDto } from "../dtos/getTicket.dto";
import { CreateTicketReqDto } from "../dtos/createTicket.dto";
import { UpdateTicketReqDto } from "../dtos/updateTicket.dto";

type EndPoints =
  | 'getAllTickets'
  | 'getTicketInfo'
  | 'createTicket'
  | 'updateTicket'
  | 'deleteTicket';

export function Docs(endPoint: EndPoints) {
  switch (endPoint) {
    case 'getAllTickets': return applyDecorators(
      ApiOperation({
        description: "구매권 목록 조회. [{id, 이름, 가격}] 반환",
        summary: "구매권 목록 조회"
      }),
      ApiParam({
        name: "studioId",
        type: Number,
        description: "스튜디오 고유 id"
      }),
      ApiOkResponse({
        type: [GetTicketResDto],
        description: "구매권 목록 조회 성공"
      })
    );
    case 'getTicketInfo': return applyDecorators(
      ApiOperation({
        description: "구매권 하나의 정보 조회. {id, 이름, 가격} 반환",
        summary: "구매권 정보 조회"
      }),
      ApiParam({
        name: "studioId",
        type: Number,
        description: "스튜디오 고유 id"
      }),
      ApiParam({
        name: "ticketId",
        type: Number,
        description: "ticket 고유 id"
      }),
      ApiOkResponse({
        type: GetTicketResDto,
        description: "구매권 정보 조회 성공"
      }),
      ApiNotFoundResponse({
        description: "존재하지 않는 구매권"
      })
    );
    case 'createTicket': return applyDecorators(
      ApiOperation({
        description: "스튜디오 측 구매권 생성 api. 현재는 백엔드에서만 사용.",
        summary: "구매권 생성"
      }),
      ApiParam({
        name: "studioId",
        type: Number,
        description: "스튜디오 고유 id"
      }),
      ApiBody({
        type: CreateTicketReqDto
      }),
      ApiCreatedResponse({
        description: "구매권 생성 성공"
      }),
    );
    case 'updateTicket': return applyDecorators(
      ApiOperation({
        description: "스튜디오 측 구매권 정보 수정 api. 현재는 백엔드에서만 사용.",
        summary: "구매권 정보 수정"
      }),
      ApiParam({
        name: "studioId",
        type: Number,
        description: "스튜디오 고유 id"
      }),    
      ApiBody({
        type: UpdateTicketReqDto
      }),
      ApiOkResponse({
        description: "구매권 정보 수정 성공"
      })
    );
    case 'deleteTicket': return applyDecorators(
      ApiOperation({
        description: "스튜디오 측 구매권 삭제 api. 현재는 백엔드에서만 사용.",
        summary: "구매권 삭제"
      }),
      ApiParam({
        name: "studioId",
        type: Number,
        description: "스튜디오 고유 id"
      }),
      ApiParam({
        name: "ticketId",
        type: Number,
        description: "ticket 고유 id"
      }),
      ApiOkResponse({
        description: "구매권 삭제 성공"
      }),
      ApiNotFoundResponse({
        description: "존재하지 않는 구매권"
      })
    );
  }
}