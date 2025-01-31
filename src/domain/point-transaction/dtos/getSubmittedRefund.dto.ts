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

class GetSubmittedRefundResDto {
  constructor(refund: any) {
    this.id = refund.refund_id;
    this.status = refund.refund_status;
    this.createdAt = refund.created_at;
    this.lecture = new LectureDto(refund);
  }

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "pending" })
  status: 'pending' | 'approved' | 'rejected';

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional({ type: LectureDto })
  lecture?: LectureDto;
}

export { GetSubmittedRefundResDto }
