import { BadRequestException, Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MediaService } from "./media.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "src/common/decorators/user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UploadFileReqDto } from "./dtos/uploadFile.dto";

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
  async uploadFile(
    @User() user,
    @Body() uploadFileReqDto: UploadFileReqDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return await this.mediaService.uploadMedia(file, uploadFileReqDto.studioId, user.id);
  }

  @Get(':studioId')
  async getFiles(@Param('studioId') studId: number) {
    return await this.mediaService.getFiles(studId)
  }
}
