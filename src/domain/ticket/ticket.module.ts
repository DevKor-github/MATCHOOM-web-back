import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketService } from './ticket.service';
import { TicketController, TicketControllerForBack } from './ticket.controller';
import { Ticket } from './entities/ticket.entity';
import { Studio } from '../studio/entities/studio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, Studio]),
  ],
  providers: [TicketService],
  controllers: [TicketController, TicketControllerForBack]
})
export class TicketModule {}
