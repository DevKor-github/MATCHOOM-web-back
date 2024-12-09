import { IsDateString, IsNumber } from "class-validator"
import { IsTime } from "src/common/decorators/time.decorator"

class ApplyTimeDto{
    @IsNumber()
    startDiff: number

    @IsNumber()
    endDiff: number

    @IsTime()
    startTime: string

    @IsTime()
    endTime: string
}

class LectureTimeDto{
    @IsDateString()
    start: Date

    @IsDateString()
    end: Date
}

export { ApplyTimeDto, LectureTimeDto }