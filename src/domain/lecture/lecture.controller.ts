import { Controller, Get, Param, Post } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';

@Controller('lecture')
@ApiTags('lecture')
export class LectureController {
    constructor(
        private readonly lectureService: LectureService
    ){}

    @Get(':id/info')
    async getLectureInfo(@Param('id') id: number){
        return 
    }

    @Post('apply')
    async applyLecture(@User() user){
        return
    }

    @Post()
    async createLecture(@User() user){
        return
    }

}
