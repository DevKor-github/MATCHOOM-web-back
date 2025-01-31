import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PointTransaction } from './entities/point-transaction.entity';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Studio } from '../studio/entities/studio.entity';
import { Lecture } from '../lecture/entities/lecture.entity';
import { Refund } from './entities/refund.entity';
import { Ticket } from '../ticket/entities/ticket.entity';
import { UpdateRefundReqDto } from './dtos/updateRefund.dto';
import { PointService } from '../point/point.service';
import { GetHistoryResDto } from './dtos/getHistory.dto';
import { Point } from '../point/entities/point.entity';
import { GetSubmittedRefundResDto } from './dtos/getSubmittedRefund.dto';
import { GetPointTransactionsResDto } from './dtos/getPointTransactions.dto';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private pointTransactionRepository: Repository<PointTransaction>,
    @InjectRepository(Refund)
    private refundRepository: Repository<Refund>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Studio)
    private studioRepository: Repository<Studio>,
    @InjectRepository(Lecture)
    private lectuerRepository: Repository<Lecture>,
    @InjectRepository(Point)
    private pointRepository: Repository<Point>
  ) { }

  async createRefund(studioId: number, lectureId: number, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['lectures'] });
    if (!user) throw new NotFoundException("존재하지 않는 사용자 입니다.");

    const studio = await this.studioRepository.findOne({ where: { id: studioId } });
    if (!studio) throw new NotFoundException("존재하지 않는 스튜디오 입니다.");

    const lecture = await this.lectuerRepository.findOne({ where: { id: lectureId } });
    if (!lecture) throw new NotFoundException("존재하지 않는 강의 입니다.");

    const isAssociated = user.lectures.some((lecture) => lecture.id === lectureId);
    if (!isAssociated) throw new NotFoundException("해당 유저가 소유한 강의가 아닙니다.");

    const isSubmitted = await this.refundRepository.findOne({ where: { user: { id: userId }, studio: { id: studioId }, lecture: { id: lectureId } } });
    if (isSubmitted) throw new ConflictException("이미 환불 신청된 강의 입니다.");

    const refund = this.refundRepository.create({
      lecture: lecture,
      user: user,
      studio: studio
    });

    await this.refundRepository.save(refund);

    return { message: "환불 신청 성공" };
  }

  /*
  async getUnsubmittedRefund(studioId: number, userId: number) {
    const lectures = await this.pointTransactionRepository.find({ 
      where: { studio: { id: studioId }, user: { id: userId } }, 
      relations: ['lectures'],

    });
  }
    */

  async getSubmittedRefund(studioId: number, userId: number) {
    const refunds = await this.refundRepository.createQueryBuilder('refund')
      .leftJoinAndSelect('refund.lecture', 'lecture')
      .leftJoinAndSelect('lecture.file', 'media')
      .select([
        'lecture.id',
        'lecture.name',
        'lecture.description',
        `CONCAT('${process.env.AWS_S3_CLOUDFRONT_DOMAIN}/images/${studioId}/', media.filename) as file`,
        'refund.id',
        'refund.status',
        'refund.created_at'
      ])
      .where('refund.studio = :studioId', { studioId })
      .andWhere('refund.user = :userId', { userId })
      .orderBy('refund.created_at', 'DESC')
      .getRawMany();

    return refunds.map(refund => new GetSubmittedRefundResDto(refund));
  }

  async getPointTransactions(studioId: number, userId: number) {
    const type = "purchase"
    const pointTransactions = await this.pointTransactionRepository.createQueryBuilder('point_transaction')
      .leftJoinAndSelect('point_transaction.lecture', 'lecture')
      .leftJoinAndSelect('lecture.file', 'media')
      .select([
        'lecture.id',
        'lecture.name',
        'lecture.description',
        `CONCAT('${process.env.AWS_S3_CLOUDFRONT_DOMAIN}/images/${studioId}/', media.filename) as file`,
        'point_transaction.created_at',
        'point_transaction.id'
      ])
      .where('point_transaction.studio = :studioId', { studioId })
      .andWhere('point_transaction.user = :userId', { userId })
      .andWhere('point_transaction.type = :type', { type })
      .orderBy('point_transaction.created_at', 'DESC')
      .getRawMany();

    return pointTransactions.map(transaction => new GetPointTransactionsResDto(transaction));
  }

  async getRefundForStudio(studioId: number) {
    const refunds = await this.refundRepository.createQueryBuilder('refund')
      .leftJoinAndSelect('refund.lecture', 'lecture')
      .leftJoinAndSelect('refund.user', 'user')
      .select([
        'lecture.name',
        'refund.id',
        'refund.status',
        'refund.created_at',
        'user.name',
        'user.phone',
        'user.account'
      ])
      .where('refund.studio = :studioId', { studioId })
      .orderBy('refund.created_at', 'DESC')
      .getMany();

    return refunds;
  }

  async updateRefund(userId: number, studioId: number, updateRefundReqDto: UpdateRefundReqDto) {
    const { refundId, status } = updateRefundReqDto;

    const refund = await this.refundRepository.findOne({ where: { id: refundId }, relations: ['user', 'lecture'] });
    if (!refund) throw new NotFoundException("해당 환불 내역이 존재하지 않습니다.");

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException("존재하지 않는 사용자 입니다.");

    const studio = await this.studioRepository.findOne({ where: { id: studioId } });

    if (user.studio.id !== refund.studio.id) throw new UnauthorizedException("해당 스튜디오의 관리자가 아닙니다.");

    refund.status = status || refund.status;

    if (status === "approved") this.updatePoint(studio, user, refund.lecture.price);

    await this.refundRepository.save(refund);

    return { message: "환불 상태 갱신" };
  }

  async getHistory(studioId: number, userId: number) {
    const pointTransactions = await this.pointTransactionRepository.createQueryBuilder('point_transaction')
      .leftJoinAndSelect('point_transaction.lecture', 'lecture')
      .leftJoinAndSelect('point_transaction.ticket', 'ticket')
      .leftJoinAndSelect('lecture.file', 'media')
      .select([
        'point_transaction.id',
        'point_transaction.amount',
        'point_transaction.type',
        'point_transaction.createdAt',
        'lecture.id',
        'lecture.name',
        'lecture.description',
        `CONCAT('${process.env.AWS_S3_CLOUDFRONT_DOMAIN}/images/${studioId}/', media.filename) as file`,
        'ticket.id',
        'ticket.point',
        'ticket.price'
      ])
      .where('point_transaction.studio = :studioId', { studioId })
      .andWhere('point_transaction.user = :userId', { userId })
      .orderBy('point_transaction.created_at', 'DESC')
      .getRawMany();

    return pointTransactions.map(transaction => new GetHistoryResDto(transaction));
  }

  async createTransaction(user: User, studio: Studio, type: 'charge' | 'purchase', ticket?: Ticket, lecture?: Lecture) {
    if (!user) throw new NotFoundException("존재하지 않는 사용자 입니다.");
    if (!studio) throw new NotFoundException("존재하지 않는 스튜디오 입니다.");

    let transaction: DeepPartial<PointTransaction>;

    switch (type) {
      case 'charge':
        transaction = this.pointTransactionRepository.create({
          amount: ticket.point,
          user: user,
          type: "charge",
          studio: studio,
          ticket: ticket
        });
        break;
      case 'purchase':
        transaction = this.pointTransactionRepository.create({
          amount: lecture.price,
          user: user,
          type: "purchase",
          studio: studio,
          lecture: lecture
        });
        break;
      default:
        throw new BadRequestException("유효하지 않은 거래 유형입니다.");
    }
    await this.pointTransactionRepository.save(transaction);
  }


  // 순환참조 문제로 인해 임시 구현
  async updatePoint(studio: Studio, user: User, amount: number) {
    const point = this.pointRepository.create({
      point: amount,
      expiration: new Date(Date.now() + 24 * 60 * 60 * 1000 * studio.pointExpiration),
      user: user,
      studio: studio
    });

    await this.pointRepository.save(point);
  }

  groupByDate(data: Array<any>) {
    const result = data.reduce((acc, element) => {
      const date = new Date(element.created_at).toISOString().split('T')[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(element);
      return acc;
    }, {});

    return result;
  }
}
