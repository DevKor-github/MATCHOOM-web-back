import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { In, MoreThan, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Point)
    private pointRepository: Repository<Point>,
    /*
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket)
    */
  ) { }

  async getMyPoints(studioId: number, userId: number) {
    // studio 테이블 생성 시 where에 stuio: { id: studioId } 추가 예정
    return await this.pointRepository.find({ 
      where: { user: { id: userId }, expiration: MoreThan(new Date()), point: MoreThan(0) },
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
      .andWhere('point.point > 0')
      .getRawOne();

    return total || 0;
  }

  async spendPoints(studioId: number, userId: number, amount: number) {
    const totalPoint = await this.getTotalPoint(studioId, userId);
    if (totalPoint < amount) throw new Error("남은 포인트가 충분하지 않습니다.");

    let remainingAmount = amount;
    const points = await this.getMyPoints(studioId, userId);
    for (const p of points) {
      if (remainingAmount <= 0) break;
      const deduction = Math.min(p.point, remainingAmount);
      remainingAmount -= deduction;
      p.point = deduction;

      await this.pointRepository.save(p);
    };
  }

  async chargePoint(studioId: number, userId: number, ticketId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException("존재하지 않는 유저 입니다.");
/*
    const ticket = await this.ticketRepository.findOne({ where: { id: ticketId, studio: {id: studioId} } });
    if (!ticket) throw new NotFoundException("존재하지 않는 티켓입니다.");
    const amount = ticket.point;
*/
    // studio table 추가되면 studio: studio 추가.
    const point = this.pointRepository.create({
      // point: amount,
      expiration: new Date(Date.now() + 24 * 60 * 60 * 1000 * 30),
      user: user
    });

    await this.pointRepository.save(point);
  }
}
