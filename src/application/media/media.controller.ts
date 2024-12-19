import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MediaService } from "./media.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "src/common/decorators/user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UploadFileReqDto } from "./dtos/uploadFile.dto";
import { Docs } from "./docs/decorators/media.decorator";

@Controller('media')
@ApiTags('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService
  ) { }

  @Post('upload')
  @UseGuards(AuthGuard('jwt-access'))
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
      const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp']
      if (allowed.includes(file.mimetype)) callback(null, true)
      else callback(new BadRequestException('허용되지 않은 확장자입니다'), false)
    }
  }))
  @Docs('upload')
  async uploadFile(
    @User() user,
    @Body('studioId', ParseIntPipe) studioId: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    return await this.mediaService.uploadMedia(file, studioId, user.id);
  }

  @Get(':studioId')
  @UseGuards(AuthGuard('jwt-access'))
  @Docs('getFiles')
  async getFiles(@Param('studioId') studioId: number) {
    return await this.mediaService.getFiles(studioId);
  }
}
