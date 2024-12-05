import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Studio } from './entities/studio.entity';
import { Lecture } from '../lecture/entities/lecture.entity';
import { Repository } from 'typeorm';
import { GetLectureDto } from '../lecture/dtos/lecture.dto';
import { PostAnnouncement } from './dtos/announcement.dto';
import { Announcement } from './entities/announcement.entity';

@Injectable()
export class StudioService {
    constructor(
        @InjectRepository(Announcement)
        private announcementRepository: Repository<Announcement>,
        @InjectRepository(Studio)
        private studioRepository: Repository<Studio>
    ){}

    async getStudioInfo(id: number){
        const stud = await this.studioRepository.findOne({
            where: {id: id},
            relations: ['lectures']
        })
        if(!stud) throw new NotFoundException

        const lectures: GetLectureDto[] = stud.lectures.map((e) => ({
            lectureId: e.id,
            thumbnail: `${process.env.CLOUDFRONT_URL}/$${id}/${e.file.filename}`,
            studioName: stud.name,
            instructor: e.instructor,
            description: e.description
        }))

        return {
            name: stud.name,
            description: stud.description,
            policy: stud.policy,
            lectures
        }
    }
    
    async getStudioAnnouncement(id: number){
        const stud = await this.studioRepository.findOne({
            where: {id: id},
            relations: ['announcements']
        })

        if(!stud) throw new NotFoundException
        const announcements = stud.announcements.map(({studio,  ...rest}) => rest)
        return announcements
    }

    async postStudioAnnouncement(id: number, userId: number, toCreate: PostAnnouncement){
        const stud = await this.studioRepository.findOne({
            where: {id: id},
            relations: ['admin']
        })
        if(!stud) throw new NotFoundException
        const isAdmin = stud.admin.some((e) => e.id === userId)
        if(!isAdmin) throw new ForbiddenException

        const newAnnouncement: Partial<Announcement> = {...toCreate, studio: stud}
        const newAnnounce = this.announcementRepository.create(newAnnouncement)
        const res = await this.announcementRepository.save(newAnnounce)

        return res
    }

    async deleteAnnouncement(id: number, userId: number){
        const an = await this.announcementRepository.findOne({
            where: {id: id},
            relations: ['studio.admin']
        })
        if(!an) throw new NotFoundException
        const isAdmin = an.studio.admin.some((e) => e.id === userId)
        if(!isAdmin) throw new ForbiddenException

        try{
            await this.announcementRepository.delete(id)
        }catch(err){
            throw new InternalServerErrorException(err)
        }

        return { message: "success", target: id }
    }
}
