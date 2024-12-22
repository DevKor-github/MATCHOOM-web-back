import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateLectureDto, DeleteLectureDto, GetLectureDto, LectureApplyDto } from './dtos/lecture.dto';
import { Media } from 'src/application/media/entities/media.entity';
import { Point } from '../point/entities/point.entity';

@Injectable()
export class LectureService {
    constructor(
        @InjectRepository(Lecture)
        private lectureRepository: Repository<Lecture>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Media)
        private mediaRepository: Repository<Media>,
        @InjectRepository(Point)
        private pointRepository: Repository<Point>
    ){}

    async createLecture(createLectureDto: CreateLectureDto, userId: number){
        const usr = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['studio', 'studio.medias']
        })
        if(!usr) throw new NotFoundException("유저 X")
        if(!usr.studio) throw new ForbiddenException("스튜디오 관계 존재 X")

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


        const { name, instructor, maxCapacity, minCapacity, room, price, 
            difficulty, type, genre, description, musicLink, lectureTime } = createLectureDto

        const toCreate = {
            name, instructor, applyStart, applyEnd, maxCapacity, minCapacity, 
            room, price, difficulty, type, genre, description, musicLink, lectureTime,
            studio: usr.studio,
        }

        if (createLectureDto.fileId && usr.studio.medias) {
            const mediaOwn = usr.studio.medias.find((m) => m.id === createLectureDto.fileId)
            if (!mediaOwn) {
                throw new ForbiddenException("잘못된 fileId")
            }
            
            const media = await this.mediaRepository.findOne({
                where: {id: createLectureDto.fileId}
            })
            if (!media) {
                throw new NotFoundException("해당하는 파일을 찾을 수 없습니다.")
            }
            
            toCreate['file'] = media
        }

        try {
            await this.lectureRepository.save(toCreate)
            
            const updatedStudio = await this.userRepository.findOne({
                where: { id: userId },
                relations: ['studio', 'studio.lectures', 'studio.thumbnail']
            })
            
            return {
                studioName: updatedStudio?.studio.name,
                thumbnail: updatedStudio?.studio.thumbnail?.filename || null,
                lectures: updatedStudio?.studio.lectures
            }
        } catch (error) {
            console.error('강의 생성 중 오류 발생:', error)
            throw new Error('강의 생성에 실패했습니다.')
        }
    }

    async deleteLecture(deleteLectureDto: DeleteLectureDto, userId: number){
        const {lectureId} = deleteLectureDto
        const lec = await this.lectureRepository.findOne({
            where: {id: lectureId},
            relations: ['studio', 'studio.admin']
        })
        if(!lec) throw new NotFoundException

        const isOwner = lec.studio.admin.id === userId
        if(!isOwner) throw new ForbiddenException

        const now = new Date()
        if (lec.applyStart <= now && now <= lec.applyEnd) {
            throw new ForbiddenException("신청기간 중에는 강의를 삭제할 수 없습니다.")
        }
        
        try {
            await this.lectureRepository.delete(lectureId);
            return { message: `강의가 성공적으로 삭제되었습니다.` };
        } catch (error) {
            console.error('강의 삭제 중 오류 발생:', error);
            throw new Error('강의 삭제에 실패했습니다.');
        }
    }

    async getLectureInfo(lectureId: number){
        const lec = await this.lectureRepository.findOne({
            where: {id: lectureId},
            relations: ['studio', 'file']
        })
        if(!lec) throw new NotFoundException(`ID ${lectureId}에 해당하는 강의는 없습니다.`)
        const res: GetLectureDto = {
            lectureId: lec.id,
            thumbnail: lec.file
                ? `${process.env.AWS_S3_CLOUDFRONT_DOMAIN}/images/${lec.studio.id}/${lec.file.filename}`: null,
            lectureTime: lec.lectureTime,
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
            relations: ['student', 'studio']
        })
        if(!lec) throw new NotFoundException("강의를 찾을 수 없습니다.")

        const stud = await this.userRepository.findOne({
            where: {id: userId},
            relations: ['points']
        })
        if(!stud.points) throw new ForbiddenException("포인트가 부족합니다.")
            
        const totalAvailablePoints = stud.points
        .filter(p => p.expiration > new Date() && p.studio.id === lec.studio.id)
        .reduce((sum, p) => sum + p.point, 0)

        if(totalAvailablePoints < lec.price) throw new ForbiddenException("포인트가 부족합니다.")

        const sortedPoints = stud.points
        .filter(p => p.expiration > new Date() && p.studio.id === lec.studio.id)
        .sort((a, b) => a.expiration.getTime() - b.expiration.getTime())

        let remainingPrice = lec.price
        for (const point of sortedPoints){
            if(remainingPrice <= 0) break
            if(point.point > remainingPrice){
                point.point -= remainingPrice
                await this.pointRepository.save(point)
                remainingPrice = 0
            } else {
                remainingPrice -= point.point
                point.expiration = new Date()
                await this.pointRepository.save(point)
            }
        }

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
            message: "등록성공",
            result: `${lec.student.length}/${lec.maxCapacity ?? '무제한'}`
        }
    }
}
