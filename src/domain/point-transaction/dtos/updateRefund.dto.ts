import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { RefundStatus } from "../enums/refund-status.enum";

class UpdateRefundReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  refundId: number;

  @IsEnum(RefundStatus)
  @IsNotEmpty()
  @ApiProperty({ example: "approved" })
  status: RefundStatus;
}

export { UpdateRefundReqDto }
