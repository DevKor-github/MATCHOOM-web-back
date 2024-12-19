import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

class PurchasePointReqDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  ticketId: number;
}

export { PurchasePointReqDto };
