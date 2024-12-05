import { ApiProperty } from "@nestjs/swagger"
import { Point } from "../entities/point.entity";
import { formatDate } from "date-fns";

class GetPointResDto {
  constructor(point: Point) {
    this.point = point.point;
    this.expiration = formatDate(point.expiration, 'yyyy-MM-dd HH:mm');
  }

  @ApiProperty({ example: 20000 })
  point: number;

  @ApiProperty({ example: "1900-01-01 02:30" })
  expiration: string;
}

export { GetPointResDto }
