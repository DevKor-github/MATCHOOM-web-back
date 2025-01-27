import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class UpdateRefundReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  refundId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "approved" })
  status: 'pending' | 'approved' | 'rejected';
}

export { UpdateRefundReqDto }
