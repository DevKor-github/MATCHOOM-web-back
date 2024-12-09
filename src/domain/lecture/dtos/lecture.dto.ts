import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsString, IsUrl, Max, MaxLength, Min, Validate, ValidateNested } from "class-validator";
import { ApplyTimeDto, LectureTimeDto } from "./time.dto"

class CreateLectureDto{
    @IsString()
    @ApiProperty({example: "강의 이름"})
    name: string

    @IsString()
    @ApiProperty({example: "강사명"})
    instructor: string

    @IsNumber()
    @IsOptional()
    @ApiProperty({example: "Studio에 연결된 File 테이블에서의 File id"})
    fileId?: number

    @ApiProperty({ example: [ { start: '2024-12-09T16:52:00.000Z', end: '2024-12-09T17:52:00.000Z' },],})
    @ValidateNested({each: true})
    @Type(() => LectureTimeDto)
    lectureTime: LectureTimeDto[]

    @IsNumber()
    maxCapacity: number

    @IsNumber()
    minCapacity: number

    @IsString()
    @ApiProperty({example: "강의 진행 위치"})
    room: string

    @IsNumber()
    @ApiProperty({example:20000})
    price: number

    @IsInt()
    @Max(3)
    @Min(0)
    @IsOptional()
    @ApiProperty({example: "0: Free 1: Basic 2: Middle 3: Professional"})
    difficulty?: number

    @IsString()
    @IsOptional()
    @ApiProperty({example: "true이면 원데이 false이면 정기강의"})
    type?: string

    @IsInt()
    @IsOptional()
    @Max(20)
    @Min(0)
    @ApiProperty({example: "장르코드 / 0~10 중 하나만 number"})
    genre?: number

    @IsString()
    @IsOptional()
    @MaxLength(500, {message: "강의 설명은 500자 이하여야 합니다."})
    @ApiProperty({example: "강의설명설명설명"})
    description?: string

    @IsUrl()
    @IsOptional()
    musicLink?: string

    @ValidateNested()
    @Type(() => ApplyTimeDto)
    applyTime: ApplyTimeDto
}

class GetLectureDto{
    @Expose()
    lectureId: number
    
    @Expose()
    thumbnail: string

    @Expose()
    studioName: string

    @Expose()
    instructor: string

    @Expose()
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

export { CreateLectureDto, DeleteLectureDto, LectureApplyDto, GetLectureDto }
