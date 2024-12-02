import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDateString, IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

class CreateLectureDto{
    @IsString()
    @ApiProperty({example: "강의 이름"})
    name: string

    @IsString()
    @ApiProperty({example: "강사명"})
    instructor: string

    @IsNumber()
    @IsOptional()
    @ApiProperty({example: "User에 연결된 File 테이블에서의 File id"})
    file: number

    @IsDateString()
    @ApiProperty({example: "강의 시간 As DateString[]"})
    date: Date[]

    @IsString()
    @ApiProperty({example: "강의 진행 위치"})
    room: string

    @IsNumber()
    @ApiProperty({example:20000})
    price: number

    @IsInt()
    @Max(3)
    @Min(0)
    @ApiProperty({example: "0: Free 1: Basic 2: Middle 3: Professional"})
    difficulty: number

    @IsString()
    @IsOptional()
    @ApiProperty({example: "true이면 원데이 false이면 정기강의"})
    type: string

    @IsInt()
    @IsOptional()
    @Max(10)
    @Min(0)
    @ApiProperty({example: "장르코드 / 0~10 중 하나만 number"})
    genre: number

    @IsString()
    @IsOptional()
    @MaxLength(500, {message: "강의 설명은 500자 이하여야 합니다."})
    @ApiProperty({example: "강의설명설명설명"})
    description: string
}

class DeleteLectureDto{
    @IsNumber()
    lectureId: number
}

class LectureApplyDto{
    @IsNumber()
    lectureId: number
}

export { CreateLectureDto, DeleteLectureDto, LectureApplyDto }