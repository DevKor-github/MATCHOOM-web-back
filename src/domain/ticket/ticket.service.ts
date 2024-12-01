import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTicketResDto } from './dtos/getTicket.dto';
import { CreateTicketReqDto } from './dtos/createTicket.dto';
import { UpdateTicketReqDto } from './dtos/updateTicket.dto';

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
    const studio = await this.studioRepository.findOne({ where: { id: studioId } });
    if (!studio) throw new NotFoundException("존재하지 않는 스튜디오 입니다.");

    const ticket = this.ticketRepository.create({ 
      ...createTicketReqDto,
      studio
    });
    await this.ticketRepository.save(ticket);
*/
    return { message: "티켓 생성 성공" };
  }

  async updateTicket(studioId: number, ticketId: number, updateTicketReqDto: UpdateTicketReqDto) {/*
    const ticket = await this.ticketRepository.findOne({ where: { id: ticketId, studio: { id: studioId } } });
    if (!ticket) throw new NotFoundException("존재하지 않는 티켓입니다.");

    const { name, price, point } = updateTicketReqDto;

    ticket.name = name || ticket.name;
    ticket.price = price || ticket.price;
    ticket.point = point || ticket.point;

    await this.ticketRepository.save(ticket);
*/
    return { message: "티켓 정보 수정 성공" };
  }

  async deleteTicket(studioId: number, ticketId: number) {
    const ticket = await this.ticketRepository.findOne({ where: { id: ticketId, studio: { id: studioId } } });
    if (!ticket) throw new NotFoundException("존재하지 않는 티켓입니다.");

    return { message: "티켓 삭제 성공" };
  }
}
