import { Test, TestingModule } from '@nestjs/testing';
import { ClaimController } from './claim.controller';
import { ClaimService } from '../services/claim.service';

describe('ClaimController', () => {
  let controller: ClaimController;
  let service: ClaimService;

  const mockClaimService = {
    createClaim: jest.fn(dto => ({
      _id: 'claimid1',
      ...dto,
      status: 'SUCCESS',
    })),
    getClaims: jest.fn(userId => [
      { _id: 'claimid1', userId: userId || 'user1', status: 'SUCCESS' },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaimController],
      providers: [{ provide: ClaimService, useValue: mockClaimService }],
    }).compile();

    controller = module.get<ClaimController>(ClaimController);
    service = module.get<ClaimService>(ClaimService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create claim', async () => {
    const dto = {
      userId: 'user1',
      eventId: 'eventid1',
      rewardId: 'rewardid1',
    };
    const result = await controller.createClaim(dto);
    expect(result.userId).toBe(dto.userId);
    expect(result.status).toBe('SUCCESS');
    expect(service.createClaim).toHaveBeenCalledWith(dto);
  });

  it('should get claims by userId', async () => {
    const userId = 'user1';
    const result = await controller.getClaims(userId);
    expect(result[0].userId).toBe(userId);
    expect(service.getClaims).toHaveBeenCalledWith(userId);
  });

  it('should get all claims if no userId', async () => {
    const result = await controller.getClaims(undefined);
    expect(service.getClaims).toHaveBeenCalledWith(undefined);
  });
});
