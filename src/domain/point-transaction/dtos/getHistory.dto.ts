import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Media } from "src/application/media/entities/media.entity";

class LectureDto {
  constructor(lecture: any) {
    this.id = lecture.lecture_id;
    this.name = lecture.lecture_name;
    this.description = lecture.lecture_description;
    this.file = lecture.file;
  }

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "강의명" })
  name: string;

  @ApiProperty({ example: "강의 설명" })
  description: string;

  @ApiProperty({ example: "이미지 url" })
  file: Media;
}

class TicketDto {
  constructor(ticket: any) {
    this.id = ticket.ticket_id;
    this.point = ticket.ticket_point;
    this.price = ticket.ticket_price;
  }

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 30000 })
  point: number;

  @ApiProperty({ example: 30000 })
  price: number
}

class GetHistoryResDto {
  constructor(pointTransaction: any) {
    this.id = pointTransaction.point_transaction_id;
    this.amount = pointTransaction.point_transaction_amount;
    this.type = pointTransaction.point_transaction_type;
    this.createdAt = pointTransaction.point_transaction_created_at;

    if (this.type === "purchase") this.lecture = new LectureDto(pointTransaction);
    else this.ticket = new TicketDto(pointTransaction);
  }

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
