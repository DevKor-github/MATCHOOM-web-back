import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

class RegisterReqDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: "이름" })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: "01000000000" })
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: "하나은행" })
  bank?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: "3333333333333" })
  account?: string;
}

export { RegisterReqDto }
