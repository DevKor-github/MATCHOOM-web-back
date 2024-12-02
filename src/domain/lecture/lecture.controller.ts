import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { CreateLectureDto, DeleteLectureDto, LectureApplyDto } from './dtos/lecture.dto';

@Controller('lecture')
@ApiTags('lecture')
export class LectureController {
    constructor(
        private readonly lectureService: LectureService
    ){}

    @Get(':id/info')
    async getLectureInfo(@Param('id') id: number){
        return this.lectureService.getLectureInfo(id)
    }

    @Post('apply')
    async applyLecture(
        @Body() lectureApplyDto: LectureApplyDto,
        @User() user
    ){
        return this.lectureService.applyLecture(lectureApplyDto, user.id)
    }

    @Post()
    async createLecture(
        @Body() createLectureDto: CreateLectureDto, 
        @User() user
    ){
        return this.lectureService.createLecture(createLectureDto, user.id)
    }

    @Delete()
    async deleteLecture(
        @Body() deleteLectureDto: DeleteLectureDto,
        @User() user
    ){
        return this.lectureService.deleteLecture(deleteLectureDto, user.id)
    }

}
