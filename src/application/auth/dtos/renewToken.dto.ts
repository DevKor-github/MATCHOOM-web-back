import { ApiProperty } from '@nestjs/swagger';

class RenewTokenResponseDto {
  @ApiProperty({ example: "xxxx.xxxx.xxxx" })
  accessToken: string;
}

export { RenewTokenResponseDto }
