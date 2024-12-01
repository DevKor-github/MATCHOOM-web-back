import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTicketResDto } from './dtos/getTicket.dto';
import { CreateTicketReqDto } from './dtos/createTicket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    /*
    @InjectRepository(Studio)
    private studioRepository: Repository<Studio>
    */
  ) { }

  async getAllTickets(studioId: number) {
    /*
    return await this.ticketRepository.find({ 
      where: { studio: { id: studioId } }, 
      relations: ['studio'],
      select: ['id', 'name', 'price']
    });
    */
  }

  async getTicketInfo(studioId: number, ticketId: number) {
    /*
    return await this.ticketRepository.findOne({ 
      where: { studio: { id: studioId }, id: ticketId },
      relations: ['studio'],
      select: ['id', 'name', 'price']
    });
    */
  }

  async createTicket(studioId: number, createTicketReqDto: CreateTicketReqDto) {
    /*
    const studio = this.studioRepository.findOne({ where: { id: studioId } });
    if (!studio) throw new NotFoundException("존재하지 않는 스튜디오 입니다.");

    const ticket = this.ticketRepository.create({ 
      ...createTicketReqDto,
      studio
    });
    await this.ticketRepository.save(ticket);
*/
    return { message: "티켓 생성 성공" };
  }
}
