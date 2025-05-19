import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reward } from '../schemas/reward.schema';
import { Model } from 'mongoose';
import { CreateRewardDto } from '../dto/eventdto.dto';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(Reward.name) private readonly rewardModel: Model<Reward>,
  ) {}

  async createReward(dto: CreateRewardDto) {
    return this.rewardModel.create(dto);
  }

  async getAllRewards(eventId?: string) {
    if (eventId) {
      return this.rewardModel.find({ eventId }).exec();
    }
    return this.rewardModel.find().exec();
  }
}
