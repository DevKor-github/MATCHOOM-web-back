import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ApiTags } from '@nestjs/swagger';

@Controller(':studioId/ticket')
@ApiTags('ticket')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService
  ) { }

  @Get()
  async getAllTickets(@Param('studioId')studioId: number) {

  }

  @Get(':ticketId')
  async getTicketInfo(@Param('studioId')studioId: number, @Param('ticketId') ticketId: number) {
    
  }

  @Post()
  async createTicket(@Body() ticketCreateReqDto: any) {

  }

  @Patch(':ticketId')
  async updateTicket(@Body() ticketUpdateReqDto: any, @Param('ticketId') ticketId: number) {

  }

  @Delete(':ticketId')
  async deleteTicket(@Param('ticketId') ticketId: number) {

  }
}
