import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
    async getStudioInfo(@Param('id') id: number){
        return this.studioService.getStudioInfo(id)
    }

    @Get(':id/announcement')
    async getStudioAnnouncement(@Param('id') id: number){
        return this.studioService.getStudioAnnouncement(id)
    }

    @Post(':id/announcement')
    @UseGuards(AuthGuard('jwt-access'))
    async postStudioAnnouncement(
        @Param('id') id: number,
        @Body() postAnnouncment: PostAnnouncement,
        @User() user: UserPayload
    ){
        return this.studioService.postStudioAnnouncement(id, user.id, postAnnouncment)
    }

    @Delete('announcement')
    @UseGuards(AuthGuard('jwt-access'))
    async deleteStudioAnnouncement(
        @Query('id') id: number,
        @User() user: UserPayload
    ){
        return this.studioService.deleteAnnouncement(id, user.id)
    }

    @Get(':id/search')
    async getSearchResult(
        @Param('id') id: number,
        @Query('keyword') keyword?: string,
        @Query('date') date?: string
    ){
        return
    }
}
