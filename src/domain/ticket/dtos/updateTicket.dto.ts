import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

class UpdateTicketReqDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ example: "구매권 이름" })
  name?: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ example: 50000 })
  price: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ example: 20000 })
  point: number;
}

export { UpdateTicketReqDto }
