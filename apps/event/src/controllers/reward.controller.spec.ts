import { Test, TestingModule } from '@nestjs/testing';
import { RewardController } from './reward.controller';
import { RewardService } from '../services/reward.service';

describe('RewardController', () => {
  let controller: RewardController;
  let service: RewardService;

  const mockRewardService = {
    createReward: jest.fn(dto => ({
      _id: 'rewardid1',
      ...dto,
    })),
    getAllRewards: jest.fn(eventId => [
      { _id: 'rewardid1', eventId, type: 'point', amount: 100 },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardController],
      providers: [{ provide: RewardService, useValue: mockRewardService }],
    }).compile();

    controller = module.get<RewardController>(RewardController);
    service = module.get<RewardService>(RewardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create reward', async () => {
    const dto = {
      eventId: 'eventid1',
      type: 'item',
      amount: 1,
      detail: '아이템1',
    };
    const result = await controller.createReward(dto);
    expect(result.type).toBe(dto.type);
    expect(service.createReward).toHaveBeenCalledWith(dto);
  });

  it('should get all rewards', async () => {
    const eventId = 'eventid1';
    const result = await controller.getAllRewards(eventId);
    expect(result[0].eventId).toBe(eventId);
    expect(service.getAllRewards).toHaveBeenCalledWith(eventId);
  });
});
