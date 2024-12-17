import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudioService } from './studio.service';
import { User } from 'src/common/decorators/user.decorator';
import { PostAnnouncement } from './dtos/announcement.dto';
import { UserPayload } from 'src/common/interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { Docs } from './docs/decorators/studio.decorator';

@Controller('studio')
@ApiTags('studio')
export class StudioController {
    constructor(
        private readonly studioService: StudioService
    ){}

    @Get(':id/info')
    @Docs('getStudioInfo')
    async getStudioInfo(@Param('id') id: number){
        return this.studioService.getStudioInfo(id)
    }

    @Get(':id/announcement')
    @Docs('getStudioAnnouncement')
    async getStudioAnnouncement(@Param('id') id: number){
        return this.studioService.getStudioAnnouncement(id)
    }

    @Post(':id/announcement')
    @UseGuards(AuthGuard('jwt-access'))
    @Docs('postStudioAnnouncement')
    async postStudioAnnouncement(
        @Param('id') id: number,
        @Body() postAnnouncement: PostAnnouncement,
        @User() user: UserPayload
    ){
        return this.studioService.postStudioAnnouncement(id, user.id, postAnnouncement)
    }

    @Delete('announcement')
    @UseGuards(AuthGuard('jwt-access'))
    @Docs('deleteStudioAnnouncement')
    async deleteStudioAnnouncement(
        @Body('id') id: number,
        @User() user: UserPayload
    ){
        return this.studioService.deleteAnnouncement(id, user.id)
    }

    @Get(':id/search')
    @Docs('getStudioSearchResult')
    async getSearchResult(
        @Param('id') id: number,
        @Query('keyword') keyword?: string,
        @Query('date') date?: string
    ){
        return
    }
}
