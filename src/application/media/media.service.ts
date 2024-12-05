import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ForbiddenException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Studio } from 'src/domain/studio/entities/studio.entity';
import { Repository } from 'typeorm';
import { v4 as v4 } from 'uuid'
import { Media } from './entities/media.entity';

@Injectable()
export class MediaService {

  constructor(
    @InjectRepository(Studio)
    private studioRepository: Repository<Studio>,
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    @Inject('S3_CLIENT')
    private readonly s3Cleint: S3Client
  ) { }

  async uploadMedia(file: Express.Multer.File, studioId: number, userId: number) {
    const studio = await this.studioRepository.findOne({
      where: { id: studioId },
      relations: ['medias', 'admin']
    })
    if (!studio) throw new NotFoundException("존재하지 않는 스튜디오 입니다.");

    /*
    const isOwner = studio.admin.some(e => e.id === userId);
    if (!isOwner) throw new ForbiddenException("");
    */

    const uuid = v4();
    const extension = file.originalname.split('.').pop();
    const filename = `${uuid}.${extension}`;
    const key = `images/${studioId}/${filename}`;

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    try {
      await this.s3Cleint.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }));
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

    const newMedia = this.mediaRepository.create({
      studio: studio,
      filename
    });

    await this.mediaRepository.save(newMedia);

    return { message: 'success', url: this.fileurlMaker(studio.id, filename) };
  }

  async getFiles(studioId: number) {
    const studio = await this.studioRepository.findOne({ where: { id: studioId } });
    if (!studio) throw new NotFoundException("존재하지 않는 스튜디오 입니다.");

    const files = await this.mediaRepository.find({
      where: { studio: { id: studioId } },
      select: ['filename'],
      order: { date: 'ASC' }
    }); 

    const fileList = files.map(f => `${process.env.AWS_S3_CLOUDFRONT_DOMAIN}/images/${studioId}/${f.filename}`);

    return fileList;
  }

  fileurlMaker(id: number, filename: string[] | string) {
    const baseUrl = process.env.AWS_S3_CLOUDFRONT_DOMAIN;
    return Array.isArray(filename)
      ? filename.map((file) => `${baseUrl}/${id}/${file}`)
      : `${baseUrl}/${id}/${filename}`;
  }
}
