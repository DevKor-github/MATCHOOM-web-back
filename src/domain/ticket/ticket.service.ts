import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTicketResDto } from './dtos/getTicket.dto';

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
}
