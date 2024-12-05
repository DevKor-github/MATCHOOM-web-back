import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class CreateTicketReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "구매권 이름" })
  name?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 50000 })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 20000 })
  point: number;
}

export { CreateTicketReqDto }
