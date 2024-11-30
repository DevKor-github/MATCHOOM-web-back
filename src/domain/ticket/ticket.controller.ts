import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ApiTags } from '@nestjs/swagger';

@Controller(':studio/ticket')
@ApiTags('ticket')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService
  ) { }

  @Get()
  async getAllTickets(@Param('studio')studio: number) {
    
  }

  @Get(':ticketId')
  async getTicketInfo(@Param('studio')studio: number, @Param('ticketId') TicketId: number) {
    
  }

  @Post()
  async createTicket(@Body() ticketCreateReqDto: any) {

  }

  @Patch(':ticketId')
  async updateTicket(@Body() ticketUpdateReqDto: any, @Param('ticketId') TicketId: number) {

  }

  @Delete(':ticketId')
  async deleteTicket(@Param('ticketId') TicketId: number) {

  }
}
