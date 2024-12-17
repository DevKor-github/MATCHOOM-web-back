import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { StudioService } from './studio.service';
import { User } from 'src/common/decorators/user.decorator';
import { PostAnnouncement } from './dtos/announcement.dto';
import { UserPayload } from 'src/common/interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('studio')
@ApiTags('studio')
export class StudioController {
    constructor(
        private readonly studioService: StudioService
    ){}

    @Get(':id/info')
    @ApiOperation({ summary: '스튜디오 정보 조회' })
    @ApiParam({ name: 'id', type: Number, description: '스튜디오 ID' })
    @ApiResponse({ status: 200, description: '스튜디오 정보 조회 성공' })
    @ApiResponse({ status: 404, description: '스튜디오 정보 조회 실패' })
    async getStudioInfo(@Param('id') id: number){
        return this.studioService.getStudioInfo(id)
    }

    @Get(':id/announcement')
    @ApiOperation({ summary: '스튜디오 공지사항 조회' })
    @ApiParam({ name: 'id', type: Number, description: '스튜디오 ID' })
    @ApiResponse({ status: 200, description: '스튜디오 공지사항 조회 성공' })
    @ApiResponse({ status: 404, description: '스튜디오 공지사항 조회 실패' })
    async getStudioAnnouncement(@Param('id') id: number){
        return this.studioService.getStudioAnnouncement(id)
    }

    @Post(':id/announcement')
    @UseGuards(AuthGuard('jwt-access'))
    @ApiBearerAuth('jwt-access')
    @ApiOperation({ summary: '스튜디오 공지사항 게시' })
    @ApiParam({ name: 'id', type: Number, description: '스튜디오 ID' })
    @ApiBody({ type: PostAnnouncement, description: '공지사항 게시 데이터' })
    @ApiResponse({ status: 201, description: '스튜디오 공지사항 게시 성공' })
    @ApiResponse({ status: 400, description: '스튜디오 공지사항 게시 실패' })
    async postStudioAnnouncement(
        @Param('id') id: number,
        @Body() postAnnouncement: PostAnnouncement,
        @User() user: UserPayload
    ){
        return this.studioService.postStudioAnnouncement(id, user.id, postAnnouncement)
    }

    @Delete('announcement')
    @UseGuards(AuthGuard('jwt-access'))
    @ApiBearerAuth('jwt-access')
    @ApiOperation({ summary: '스튜디오 공지사항 삭제' })
    @ApiQuery({ name: 'id', type: Number, description: '삭제할 공지사항 ID' })
    @ApiResponse({ status: 200, description: '스튜디오 공지사항 삭제 성공' })
    @ApiResponse({ status: 404, description: '스튜디오 공지사항 삭제 실패' })
    async deleteStudioAnnouncement(
        @Body('id') id: number,
        @User() user: UserPayload
    ){
        return this.studioService.deleteAnnouncement(id, user.id)
    }

    @Get(':id/search')
    @ApiOperation({ summary: '스튜디오 내 강의 검색' })
    @ApiParam({ name: 'id', type: Number, description: '스튜디오 ID' })
    @ApiQuery({ name: 'keyword', type: String, required: false, description: '검색 키워드' })
    @ApiQuery({ name: 'date', type: String, required: false, description: '강의 날짜' })
    @ApiResponse({ status: 200, description: '스튜디오 내 강의 검색 성공' })
    @ApiResponse({ status: 400, description: '스튜디오 내 강의 검색 실패' })
    async getSearchResult(
        @Param('id') id: number,
        @Query('keyword') keyword?: string,
        @Query('date') date?: string
    ){
        return
    }
}
