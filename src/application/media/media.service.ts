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
    ){}
    
    async uploadMedia(file: Express.Multer.File, studId: number, userId: number){
        const stud = await this.studioRepository.findOne({
            where: {id: studId},
            relations: ['medias', 'admin'] 
        })
        if(!stud) throw new NotFoundException
        
        const isOwner = stud.admin.some(e => e.id === userId)
        if(!isOwner) throw new ForbiddenException

        const uuid = v4()
        const extension = file.originalname.split('.').pop()
        const filename = `${uuid}.${extension}`
        const key = `/${stud.id}/${filename}`

        try{
            await this.s3Cleint.send(
                new PutObjectCommand({
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: key,
                    Body: file.buffer,
                    ContentType: file.mimetype, 
            }))
        }catch(err){
            throw new InternalServerErrorException(err)
        }

        const newMedia = this.mediaRepository.create({
            studio: stud,
            filename
        })

        await this.mediaRepository.save(newMedia)

        return {message: 'success', url: this.fileurlMaker(stud.id, filename)}
    }

    async getFiles(studioId: number){
        const stud = await this.studioRepository.findOne({
            where: {id: studioId},
            relations: ['medias']
        })
        if(!stud) throw new NotFoundException

        const files = stud.medias.map((e) => ({
            id: e.id,
            date: e.date,
            url: this.fileurlMaker(studioId, e.filename)
        }))

        return files
    }

    fileurlMaker(id: number, filename: string[] | string){
        const baseUrl = process.env.CLOUDFRONT_URL;
        return Array.isArray(filename)
        ? filename.map((file) => `${baseUrl}/${id}/${file}`)
        : `${baseUrl}/${id}/${filename}`;
    }
}
