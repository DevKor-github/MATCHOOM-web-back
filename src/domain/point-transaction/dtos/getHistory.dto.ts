import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class LectureDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "강의명" })
  name: string;

  @ApiProperty({ example: "강의 설명" })
  description: string;

  @ApiProperty({ example: "이미지 url" })
  file: string;
}

export class TicketDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 30000 })
  point: number;

  @ApiProperty({ example: 30000 })
  price: number
}

class GetHistoryResDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  amount: number;

  @ApiProperty({ example: "charge" })
  type: 'charge' | 'purchase';

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional({ type: LectureDto })
  lecture?: LectureDto;

  @ApiPropertyOptional({ type: TicketDto })
  ticket?: TicketDto;
}

export { GetHistoryResDto }
