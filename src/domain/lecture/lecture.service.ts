import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateLectureDto, DeleteLectureDto, GetLectureDto, LectureApplyDto } from './dtos/lecture.dto';
import { Studio } from '../studio/entities/studio.entity';

@Injectable()
export class LectureService {
    constructor(
        @InjectRepository(Lecture)
        private lectureRepository: Repository<Lecture>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Studio)
        private studioRepository: Repository<Studio>
    ){}

    async createLecture(createLectureDto: CreateLectureDto, userId: number){
        const usr = await this.userRepository.findOne({
            where: {id: userId}, 
            relations: ['studio', 'studio.medias']
        })
        if(!usr.studio) throw new ForbiddenException

        const {startDiff, startTime, endDiff, endTime} = createLectureDto.applyTime
        const [startH, startM] = startTime.split(':').map(Number)
        const startDate = new Date(createLectureDto.lectureTime[0].start)

        const applyStart = new Date(startDate)
        applyStart.setDate(applyStart.getDate() - startDiff)
        applyStart.setHours(startH, startM, 0, 0)

        const [endH, endM] = endTime.split(':').map(Number)
        const applyEnd = new Date(startDate)
        applyEnd.setDate(applyEnd.getDate() - endDiff)
        applyEnd.setHours(endH, endM, 0, 0)

        const toCreate: Partial<Lecture> = {
            applyStart, applyEnd
        }
        
        toCreate['applyStart'], toCreate['applyEnd'] = applyStart, applyEnd
        
        if(createLectureDto.fileId){
            const mediaOwn = usr.studio.medias.find((m) => m.id === createLectureDto.fileId)
            if(!mediaOwn) throw new ForbiddenException("잘못된 fileId")
        }

        for(const key in createLectureDto){
            if (
                key !== 'applyTime' &&
                createLectureDto[key] !== undefined && 
                createLectureDto[key] !== null
            ){ 
                toCreate[key] = createLectureDto[key]
            }
        }
        
        toCreate['studio'] = usr.studio
        const newLecture = this.lectureRepository.create(toCreate)
        const res = await this.lectureRepository.save(newLecture)
        
        return res
    }

    async deleteLecture(deleteLectureDto: DeleteLectureDto, userId: number){
        const {lectureId} = deleteLectureDto
        const lec = await this.lectureRepository.findOne({
            where: {id: lectureId},
            relations: ['studio', 'studio.admin']
        })
        if(!lec) throw new NotFoundException

        const isOwner = lec.studio.admin.some(e => e.id === userId)
        if(!isOwner) throw new ForbiddenException

        else this.lectureRepository.delete(lectureId)

        return {message: `Deleted Lecture successfully`}
    }

    async getLectureInfo(lectureId: number){
        const lec = await this.lectureRepository.findOne({
            where: {id: lectureId},
            relations: ['studio.name', 'studio.id']
        })
        if(!lec) throw new NotFoundException(`ID ${lectureId}에 해당하는 강의는 없습니다.`)
        const res: GetLectureDto = {
            lectureId: lec.id,
            thumbnail: lec.file
                ? `${process.env.CLOUDFRONT_URL}/$${lec.studio.id}/${lec.file.filename}`
                : `default`,
            studioName: lec.studio?.name ?? null,
            instructor: lec.instructor,
            description: lec.description
        }
        return res
    }

    async applyLecture(lectureApplyDto: LectureApplyDto, userId: number){
        const {lectureId} = lectureApplyDto
        const lec = await this.lectureRepository.findOne({
            where:{id: lectureId}, 
            relations: ['student']
        })
        if(!lec) throw new NotFoundException("강의를 찾을 수 없습니다.")
        const registerations = lec.student.length
        
        const usr = await this.userRepository.findOne({
            where: {id: userId}, 
            relations: ['lectures']
        })

        lec.student = lec.student ?? []
        usr.lectures = usr.lectures ?? []

        const isAlreadyRegistered = lec.student.some(student => student.id === userId)
        if (isAlreadyRegistered) throw new ForbiddenException('이미 강의에 포함되어 있음')

        if (lec.maxCapacity !== null && lec.maxCapacity !== undefined){
            if (lec.maxCapacity <= registerations) throw new ForbiddenException('정원 초과')
        }

        lec.student.push(usr)
        await this.lectureRepository.save(lec)

        usr.lectures.push(lec)
        await this.userRepository.save(usr)

        return {
            message: `등록 성공 ${lec.student.length}/${lec.maxCapacity ?? '무제한'}`
        }
    }
}
