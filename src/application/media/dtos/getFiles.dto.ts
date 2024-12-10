import { ApiProperty } from "@nestjs/swagger";

class GetFilesDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "https://xxxxxxx.com/xxxx" })
  path: string;
}

export { GetFilesDto };
