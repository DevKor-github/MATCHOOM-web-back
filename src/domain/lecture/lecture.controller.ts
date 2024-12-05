import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { CreateLectureDto, DeleteLectureDto, LectureApplyDto } from './dtos/lecture.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserPayload } from 'src/common/interfaces/user.interface';

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
    @UseGuards(AuthGuard('jwt-access'))
    async applyLecture(
        @Body() lectureApplyDto: LectureApplyDto,
        @User() user: UserPayload
    ){
        return this.lectureService.applyLecture(lectureApplyDto, user.id)
    }

    @Post()
    @UseGuards(AuthGuard('jwt-access'))
    async createLecture(
        @Body() createLectureDto: CreateLectureDto, 
        @User() user: UserPayload
    ){
        return this.lectureService.createLecture(createLectureDto, user.id)
    }

    @Delete()
    @UseGuards(AuthGuard('jwt-access'))
    async deleteLecture(
        @Body() deleteLectureDto: DeleteLectureDto,
        @User() user: UserPayload
    ){
        return this.lectureService.deleteLecture(deleteLectureDto, user.id)
    }

}
