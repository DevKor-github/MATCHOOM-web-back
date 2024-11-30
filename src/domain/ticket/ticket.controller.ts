import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTicketReqDto } from './dtos/createTicket.dto';
import { UpdateTicketReqDto } from './dtos/updateTicket.dto';
import { Docs } from './docs/ticket.decorator';

@Controller(':studioId/ticket')
@ApiTags('ticket')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService
  ) { }

  @Get()
  @Docs('getAllTickets')
  async getAllTickets(@Param('studioId') studioId: number) {
    return await this.ticketService.getAllTickets(studioId);
  }

  @Get(':ticketId')
  @Docs('getTicketInfo')
  async getTicketInfo(@Param('studioId') studioId: number, @Param('ticketId') ticketId: number) {
    return await this.ticketService.getTicketInfo(studioId, ticketId);
  }

  @Post()
  @Docs('createTicket')
  async createTicket(@Param('studioId') studioId: number, @Body() createTicketReqDto: CreateTicketReqDto) {

  }

  @Patch(':ticketId')
  @Docs('updateTicket')
  async updateTicket(@Body() updateTicketReqDto: UpdateTicketReqDto, @Param('ticketId') ticketId: number) {

  }

  @Delete(':ticketId')
  @Docs('deleteTicket')
  async deleteTicket(@Param('ticketId') ticketId: number) {

  }
}
