import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
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
    @ApiOperation({ summary: '강의 정보 조회' })
    @ApiParam({ name: 'id', type: Number, description: '강의 ID' })
    @ApiResponse({ status: 200, description: '강의 정보 조회 성공' })
    async getLectureInfo(@Param('id') id: number){
        return await this.lectureService.getLectureInfo(id)
    }

    @Post('apply')
    @UseGuards(AuthGuard('jwt-access'))
    @ApiBearerAuth('jwt-access')
    @ApiOperation({ summary: '강의 신청' })
    @ApiBody({ type: LectureApplyDto, description: '강의 신청 데이터' })
    @ApiResponse({ status: 201, description: '강의 신청 성공' })
    async applyLecture(
        @Body() lectureApplyDto: LectureApplyDto,
        @User() user: UserPayload
    ){
        return await this.lectureService.applyLecture(lectureApplyDto, user.id)
    }

    @Post()
    @UseGuards(AuthGuard('jwt-access'))
    @ApiBearerAuth('jwt-access')
    @ApiOperation({ summary: '강의 생성' })
    @ApiBody({ type: CreateLectureDto, description: '강의 생성 데이터' })
    @ApiResponse({ status: 201, description: '강의 생성 성공' })
    async createLecture(
        @Body() createLectureDto: CreateLectureDto, 
        @User() user: UserPayload
    ){
        return await this.lectureService.createLecture(createLectureDto, user.id)
    }

    @Delete()
    @UseGuards(AuthGuard('jwt-access'))
    @ApiBearerAuth('jwt-access')
    @ApiOperation({ summary: '강의 삭제' })
    @ApiBody({ type: DeleteLectureDto, description: '강의 삭제 데이터' })
    @ApiResponse({ status: 200, description: '강의 삭제 성공' })
    async deleteLecture(
        @Body() deleteLectureDto: DeleteLectureDto,
        @User() user: UserPayload
    ){
        return await this.lectureService.deleteLecture(deleteLectureDto, user.id)
    }

}
