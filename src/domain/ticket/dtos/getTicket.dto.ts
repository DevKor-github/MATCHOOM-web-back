import { ApiProperty } from "@nestjs/swagger";

class GetTicketResDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "구매권 이름" })
  name: string;

  @ApiProperty({ example: "" })
  price: number;
}

export { GetTicketResDto }
