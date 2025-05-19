import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/eventdto.dto';
import { Roles } from '@app/common';
import { UserRoleEnum } from '@app/interfaces';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR)
  createEvent(@Body() dto: CreateEventDto) {
    return this.eventService.createEvent(dto);
  }

  @Get()
  getAllEvents() {
    return this.eventService.getAllEvents();
  }

  @Get(':id')
  getEvent(@Param('id') id: string) {
    return this.eventService.getEventById(id);
  }
}
