import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureGroup } from '../lecture/entities/lecture.group.entity';
import { Studio } from './entities/studio.entity';
import { Lecture } from '../lecture/entities/lecture.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudioService {
    constructor(
        @InjectRepository(Lecture)
        private lectureRepository: Repository<Lecture>,
        @InjectRepository(Studio)
        private studioRepository: Repository<Studio>,
        @InjectRepository(LectureGroup)
        private lectureGroupRepository: Repository<LectureGroup>
    ){}

    async getStudioInfo(id: number){
        const stud = this.studioRepository.findOne({
            where: {id: id},
            relations: ['lectures']
        })
        return stud
    }
    
    async getStudioAnnouncement(id: number){
        const stud = this.studioRepository.findOne({
            where: {id: id},
            relations: ['announcements']
        })
        const announcements = (await stud).announcements
        return announcements
    }
}
