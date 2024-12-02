import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateLectureDto, DeleteLectureDto } from './dtos/lecture.dto';
import { Studio } from '../studio/entities/studio.entity';
import { LectureGroup } from './entities/lecture.group.entity';

@Injectable()
export class LectureService {
    constructor(
        @InjectRepository(Lecture)
        private lectureRepository: Repository<Lecture>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Studio)
        private studioRepository: Repository<Studio>,
        @InjectRepository(LectureGroup)
        private lectureGroupRepository: Repository<LectureGroup>
    ){}

    async createLecture(createLectureDto: CreateLectureDto, userId: number){
        const usr = await this.userRepository.findOne({
            where: {id: userId}, 
            relations: ['studio']
        })

        if(!usr.studio) throw ForbiddenException
        const toCreate: Partial<Lecture> = {}
        
        for(const key in createLectureDto){
            if (createLectureDto[key] !== undefined && createLectureDto[key] !== null) toCreate[key] = createLectureDto[key]
        }
        
        toCreate['studio'] = usr.studio
        const newLecture = this.lectureRepository.create(toCreate)
        const res = await this.lectureRepository.save(newLecture)
        
        return res
    }
}
