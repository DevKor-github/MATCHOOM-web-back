import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

class UploadFileReqDto {
  @IsNumber()
  @ApiProperty({ example: 3 })
  studioId: number;
}

export { UploadFileReqDto };
