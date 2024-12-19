import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { User } from 'src/common/decorators/user.decorator';
import { CreateLectureDto, DeleteLectureDto, LectureApplyDto } from './dtos/lecture.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserPayload } from 'src/common/interfaces/user.interface';
import { Docs } from './docs/decorators/lecture.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('lecture')
@ApiTags('lecture')
export class LectureController {
    constructor(
        private readonly lectureService: LectureService
    ){}

    @Get(':id/info')
    @Docs('getLectureInfo')
    async getLectureInfo(@Param('id') id: number){
        return await this.lectureService.getLectureInfo(id)
    }

    @Post('apply')
    @UseGuards(AuthGuard('jwt-access'))
    @Docs('applyLecture')
    async applyLecture(
        @Body() lectureApplyDto: LectureApplyDto,
        @User() user: UserPayload
    ){
        return await this.lectureService.applyLecture(lectureApplyDto, user.id)
    }

    @Post()
    @UseGuards(AuthGuard('jwt-access'))
    @Docs('createLecture')
    async createLecture(
        @Body() createLectureDto: CreateLectureDto, 
        @User() user: UserPayload
    ){
        return await this.lectureService.createLecture(createLectureDto, user.id)
    }

    @Delete()
    @UseGuards(AuthGuard('jwt-access'))
    @Docs('deleteLecture')
    async deleteLecture(
        @Body() deleteLectureDto: DeleteLectureDto,
        @User() user: UserPayload
    ){
        return await this.lectureService.deleteLecture(deleteLectureDto, user.id)
    }

}
