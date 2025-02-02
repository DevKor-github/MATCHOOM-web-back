import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class PostRefundReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  lectureId: number;
}

export { PostRefundReqDto }
