import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Studio } from './entities/studio.entity';
import { In, Repository } from 'typeorm';
import { GetLectureDto } from '../lecture/dtos/lecture.dto';
import { GetAnnouncement, PostAnnouncement } from './dtos/announcement.dto';
import { Announcement } from './entities/announcement.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class StudioService {
    constructor(
        @InjectRepository(Announcement)
        private announcementRepository: Repository<Announcement>,
        @InjectRepository(Studio)
        private studioRepository: Repository<Studio>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async getStudioInfo(id: number){
        const stud = await this.studioRepository.findOne({
            where: {id: id},
            relations: ['lectures', 'thumbnail', 'lectures.file']
        })
        if(!stud) throw new NotFoundException

        const lectures: GetLectureDto[] = stud.lectures.map((e) => ({
            lectureId: e.id,
            thumbnail: e.file ? 
            `${process.env.AWS_S3_CLOUDFRONT_DOMAIN}/images/${id}/${e.file.filename}`:null,
            lectureTime: e.lectureTime,
            studioName: stud.name,
            instructor: e.instructor,
            description: e.description
        }))

        return {
            name: stud.name,
            description: stud.description,
            policy: stud.policy,
            accountInfo: `(${stud.bank}) ${stud.account} (${stud.accountHolder})`,
            thumbnail: stud.thumbnail ? 
            `${process.env.CLOUDFRONT_URL}/$${id}/${stud.thumbnail.filename}`:null,
            lectures
        }
    }
    
    async getStudioAnnouncement(id: number): Promise<GetAnnouncement[]> {
        const stud = await this.studioRepository.findOne({
            where: { id: id },
            relations: ['announcements']
        })

        if (!stud) throw new NotFoundException()

        const announcements: GetAnnouncement[] = stud.announcements.map((e) => (
        {
            id: e.id,
            title: e.title,
            contents: e.contents,
            created: e.created
        }
        ))

        return announcements
    }

    async postStudioAnnouncement(userId: number, toCreate: PostAnnouncement){
        const usr = await this.userRepository.findOne({
            where: {id: userId},
            relations: ['studio']
        })
        if(!usr || !usr.studio) throw new NotFoundException

        const newAnnouncement: Partial<Announcement> = { ...toCreate, studio: usr.studio };
        try{
            const toSave = this.announcementRepository.create(newAnnouncement)
            const na = await this.announcementRepository.save(toSave)
            const { id, title, contents, created } = na
            return <GetAnnouncement>{
                id,
                title,
                contents,
                created
            }   
        }catch(err){
            throw new InternalServerErrorException(err)
        }
    }

    async deleteAnnouncement(id: number, userId: number){
        if (id === undefined || id === null) {
            throw new BadRequestException('유효한 ID가 필요합니다.')
        }

        const an = await this.announcementRepository.findOne({
            where: { id: id },
            relations: ['studio.admin']
        })

        if(!an) throw new NotFoundException

        const isAdmin = an.studio.admin.id === userId
        if(!isAdmin) throw new ForbiddenException

        try{
            await this.announcementRepository.delete({ id })
        } catch(err){
            throw new InternalServerErrorException(err)
        }

        return { message: "success", target: id }
    }
}
