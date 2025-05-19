import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from '../schemas/event.schema';
import { Model } from 'mongoose';
import { CreateEventDto } from '../dto/eventdto.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async createEvent(dto: CreateEventDto) {
    return this.eventModel.create(dto);
  }

  async getAllEvents() {
    return this.eventModel.find().exec();
  }

  async getEventById(id: string) {
    return this.eventModel.findById(id).exec();
  }
}
