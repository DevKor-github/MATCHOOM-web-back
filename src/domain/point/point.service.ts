import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private pointRepository: Repository<Point>
  ) { }

  async getMyPoints(studioId: number, userId: number) {
    // studio 테이블 생성 시 where에 stuio: { id: studioId } 추가 예정
    return await this.pointRepository.find({ 
      where: { user: { id: userId }, expiration: MoreThan(new Date()) },
      select: ['point', 'expiration'],
      order: { expiration: 'ASC' }
    });
  }

  async getTotalPoint(studioId: number, userId: number) {
    // studio 테이블 생성 시 where에 stuio: { id: studioId } 추가 예정
    const total = await this.pointRepository
      .createQueryBuilder('point')
      .select('SUM(point.point)', 'total')
      .where('point.user.id = :userId', { userId })
      .andWhere('point.expiration > :now', { now: new Date() })
      .andWhere('point.point > 0') // Add this condition
      .getRawOne();

    return total || 0;
  }

  
}
