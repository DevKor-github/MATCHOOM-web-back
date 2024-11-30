import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTicketReqDto } from './dtos/createTicket.dto';
import { UpdateTicketReqDto } from './dtos/updateTicket.dto';

@Controller(':studioId/ticket')
@ApiTags('ticket')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService
  ) { }

  @Get()
  async getAllTickets(@Param('studioId')studioId: number) {
    return await this.ticketService.getAllTickets(studioId);
  }

  @Get(':ticketId')
  async getTicketInfo(@Param('studioId')studioId: number, @Param('ticketId') ticketId: number) {
    return await this.ticketService.getTicketInfo(studioId, ticketId);
  }

  @Post()
  async createTicket(@Param('studioId')studioId: number, @Body() createTicketReqDto: CreateTicketReqDto) {

  }

  @Patch(':ticketId')
  async updateTicket(@Body() updateTicketReqDto: UpdateTicketReqDto, @Param('ticketId') ticketId: number) {

  }

  @Delete(':ticketId')
  async deleteTicket(@Param('ticketId') ticketId: number) {
    
  }
}
