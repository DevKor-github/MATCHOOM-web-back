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

class GetPointTransactionsResDto {
  constructor(pointTransaction: any) {
    this.id = pointTransaction.point_transaction_id;
    this.createdAt = pointTransaction.point_transaction_created_at;
    this.lecture = new LectureDto(pointTransaction);
  }

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional({ type: LectureDto })
  lecture: LectureDto;
}

export { GetPointTransactionsResDto }
