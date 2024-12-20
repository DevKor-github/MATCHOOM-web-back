import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsString, IsUrl, Max, MaxLength, Min, Validate, ValidateNested } from "class-validator";
import { ApplyTimeDto, LectureTimeDto } from "./time.dto"

class CreateLectureDto{
    @IsString()
    @ApiProperty({
        example: "강의 이름",
        description: "생성할 강의의 이름입니다."
    })
    name: string;

    @IsString()
    @ApiProperty({
        example: "강사명",
        description: "강의를 진행할 강사의 이름입니다."
    })
    instructor: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        example: "Studio에 연결된 File 테이블에서의 File id",
        description: "강의에 연결된 스튜디오 파일의 ID입니다.",
        required: false
    })
    fileId?: number;

    @ApiProperty({ 
        example: [ 
            { start: '2024-12-09T16:52:00.000Z', end: '2024-12-09T17:52:00.000Z' },
        ],
        description: "강의가 진행될 시간 정보 목록입니다."
    })
    @ValidateNested({ each: true })
    @Type(() => LectureTimeDto)
    lectureTime: LectureTimeDto[]

    @IsNumber()
    @ApiProperty({
        example: 30,
        description: "강의의 최대 수용 인원 수입니다."
    })
    maxCapacity: number;

    @IsNumber()
    @ApiProperty({
        example: 5,
        description: "강의의 최소 수용 인원 수입니다."
    })
    minCapacity: number;

    @IsString()
    @ApiProperty({
        example: "강의 진행 위치",
        description: "강의가 진행될 장소의 위치 정보입니다."
    })
    room: string;

    @IsNumber()
    @ApiProperty({
        example: 20000,
        description: "강의의 가격을 나타냅니다."
    })
    price: number;

    @IsInt()
    @Max(3)
    @Min(0)
    @IsOptional()
    @ApiProperty({
        example: "0: Free 1: Basic 2: Middle 3: Professional",
        description: "강의의 난이도를 나타내는 코드입니다.",
        required: false
    })
    difficulty?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: "stringstring",
        description: "강의의 유형을 나타냅니다.",
        required: false
    })
    type?: string;

    @IsInt()
    @IsOptional()
    @Max(20)
    @Min(0)
    @ApiProperty({
        example: 5,
        description: "강의의 장르를 나타내는 코드입니다. 0부터 10까지의 숫자 중 하나를 사용합니다.",
        required: false
    })
    genre?: number;

    @IsString()
    @IsOptional()
    @MaxLength(500, { message: "강의 설명은 500자 이하여야 합니다." })
    @ApiProperty({
        example: "강의설명설명설명",
        description: "강의에 대한 상세한 설명입니다. 최대 500자까지 입력 가능합니다.",
        required: false
    })
    description?: string;

    @IsUrl()
    @IsOptional()
    @ApiProperty({
        example: "https://example.com/music",
        description: "강의와 관련된 음악 링크 URL입니다.",
        required: false
    })
    musicLink?: string;

    @ValidateNested()
    @Type(() => ApplyTimeDto)
    @ApiProperty({
        type: ApplyTimeDto,
        description: "강의 신청 가능한 시간 / Diff는 N일전의 N / 시간은 NN:MM 형태로"
    })
    applyTime: ApplyTimeDto;
}

class GetLectureDto{
    @Expose()
    @ApiProperty({
        example: 1,
        description: "조회할 강의의 고유 ID입니다."
    })
    lectureId: number;
    
    @Expose()
    @ApiProperty({
        example: "thumbnail.jpg",
        description: "강의의 썸네일 이미지 URL입니다."
    })
    thumbnail: string | null;

    @Expose()
    @ApiProperty({
        type: [LectureTimeDto],
        description: "강의가 진행될 시간 정보 목록입니다."
    })
    @Type(() => LectureTimeDto)
    lectureTime: LectureTimeDto[];

    @Expose()
    @ApiProperty({
        example: "스튜디오 이름",
        description: "강의가 속한 스튜디오의 이름입니다."
    })
    studioName: string;

    @Expose()
    @ApiProperty({
        example: "강사명",
        description: "강의를 진행하는 강사의 이름입니다."
    })
    instructor: string;

    @Expose()
    @ApiProperty({
        example: "강의 설명 내용",
        description: "강의에 대한 상세 설명입니다."
    })
    description: string;
}

class DeleteLectureDto{
    @IsNumber()
    @ApiProperty({
        example: 1,
        description: "삭제할 강의의 고유 ID입니다."
    })
    lectureId: number;
}

class LectureApplyDto{
    @IsNumber()
    @ApiProperty({
        example: 1,
        description: "신청할 강의의 고유 ID입니다."
    })
    lectureId: number;
}

export { CreateLectureDto, DeleteLectureDto, LectureApplyDto, GetLectureDto }