import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from '../services/event.service';

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  const mockEventService = {
    createEvent: jest.fn(dto => ({
      _id: 'eventid1',
      ...dto,
    })),
    getAllEvents: jest.fn(() => [
      { _id: 'eventid1', name: 'Test Event' },
      { _id: 'eventid2', name: 'Event2' },
    ]),
    getEventById: jest.fn(id => ({
      _id: id,
      name: 'Test Event',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [{ provide: EventService, useValue: mockEventService }],
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create event', async () => {
    const dto = {
      name: 'New Event',
      description: 'desc',
      condition: 'login_3_days',
      startAt: new Date(),
      endAt: new Date(),
    };
    const result = await controller.createEvent(dto);
    expect(result.name).toBe(dto.name);
    expect(service.createEvent).toHaveBeenCalledWith(dto);
  });

  it('should get all events', async () => {
    const result = await controller.getAllEvents();
    expect(result.length).toBe(2);
    expect(service.getAllEvents).toHaveBeenCalled();
  });

  it('should get event by id', async () => {
    const id = 'eventid1';
    const result = await controller.getEvent(id);
    expect(result._id).toBe(id);
    expect(service.getEventById).toHaveBeenCalledWith(id);
  });
});
