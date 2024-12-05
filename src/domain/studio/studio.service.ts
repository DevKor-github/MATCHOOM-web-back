import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Studio } from './entities/studio.entity';
import { Lecture } from '../lecture/entities/lecture.entity';
import { Repository } from 'typeorm';
import { GetLectureDto } from '../lecture/dtos/lecture.dto';

@Injectable()
export class StudioService {
    constructor(
        @InjectRepository(Lecture)
        private lectureRepository: Repository<Lecture>,
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
}
