import { IsDateString, IsNumber } from "class-validator"
import { IsTime } from "src/common/decorators/time.decorator"
import { ApiProperty } from '@nestjs/swagger'

class ApplyTimeDto{
    @ApiProperty({
        example: 2,
        description: '강의 시작일로부터의 신청 시작일까지 차이 (일)'
    })
    @IsNumber()
    startDiff: number

    @ApiProperty({
        example: 3,
        description: '강의 시작일로부터 신청 종료일까지 차이 (일)'
    })
    @IsNumber()
    endDiff: number

    @ApiProperty({
        example: '09:00',
        description: '시작 시간 (HH:MM 형식)'
    })
    @IsTime()
    startTime: string

    @ApiProperty({
        example: '18:00',
        description: '종료 시간 (HH:MM 형식)'
    })
    @IsTime()
    endTime: string
}

class LectureTimeDto{
    @ApiProperty({
        example: '2024-03-20T09:00:00Z',
        description: '강의 시작 날짜 및 시간'
    })
    @IsDateString()
    start: Date

    @ApiProperty({
        example: '2024-03-20T18:00:00Z',
        description: '강의 종료 날짜 및 시간'
    })
    @IsDateString()
    end: Date
}

export { ApplyTimeDto, LectureTimeDto }