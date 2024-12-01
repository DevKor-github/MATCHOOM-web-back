import { ApiProperty } from "@nestjs/swagger"

class GetPointResDto {
  @ApiProperty({ example: 20000 })
  point: number;

  @ApiProperty({ example: "1900-01-01 02:30" })
  expiratoin: Date
}

export { GetPointResDto }
