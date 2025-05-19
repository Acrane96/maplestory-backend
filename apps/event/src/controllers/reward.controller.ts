import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { RewardService } from '../services/reward.service';
import { CreateRewardDto } from '../dto/eventdto.dto';
import { Roles } from '@app/common';
import { UserRoleEnum } from '@app/interfaces';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.OPERATOR)
  createReward(@Body() dto: CreateRewardDto) {
    return this.rewardService.createReward(dto);
  }

  @Get()
  getAllRewards(@Query('eventId') eventId: string) {
    return this.rewardService.getAllRewards(eventId);
  }
}
