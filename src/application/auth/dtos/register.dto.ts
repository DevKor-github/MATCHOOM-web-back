import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty, IsOptional, IsString } from 'class-validator';

class RegisterReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "이름" })
  name?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "01000000000" })
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "하나은행" })
  bank?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "3333333333333" })
  account?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "계좌주/계좌명" })
  accountHolder?: string;
}

class RegisterResDto {
  @ApiProperty({ example: "xxxx.xxxx.xxxx" })
  accessToken: string;
}

export { RegisterReqDto, RegisterResDto }
