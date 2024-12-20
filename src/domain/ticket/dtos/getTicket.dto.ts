import { ApiProperty } from "@nestjs/swagger";

class GetTicketResDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "구매권 이름" })
  name: string;

  @ApiProperty({ example: 30000 })
  point: number;

  @ApiProperty({ example: 40000 })
  price: number;
}

export { GetTicketResDto }
