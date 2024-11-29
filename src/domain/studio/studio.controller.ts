import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudioService } from './studio.service';

@Controller('studio')
@ApiTags('studio')
export class StudioController {
    constructor(
        private readonly studioService: StudioService
    ){}

    @Get(':id/info')
    async getStudioInfo(@Param('id') id: number){
        return
    }

    @Get(':id/announcement')
    async getStudioAnnouncement(@Param('id') id: number){
        return
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
