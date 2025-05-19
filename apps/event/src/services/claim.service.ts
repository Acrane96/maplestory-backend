import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Claim } from '../schemas/claim.schema';
import { Model } from 'mongoose';
import { CreateClaimDto } from '../dto/eventdto.dto';

@Injectable()
export class ClaimService {
  constructor(
    @InjectModel(Claim.name) private readonly claimModel: Model<Claim>,
  ) {}

  async createClaim(dto: CreateClaimDto) {
    const existing = await this.claimModel.findOne({
      userId: dto.userId,
      eventId: dto.eventId,
      rewardId: dto.rewardId,
    });
    if (existing) throw new BadRequestException('이미 신청한 보상입니다.');

    const isValid = await this.checkCondition(dto.userId, dto.eventId);
    if (!isValid) throw new BadRequestException('조건을 만족하지 않습니다.');

    return this.claimModel.create({
      ...dto,
      status: isValid ? 'SUCCESS' : 'FAILED',
      requestedAt: new Date(),
    });
  }

  // ToDo: Condition Check 로직 추가 필요
  async checkCondition(userId: string, eventId: string): Promise<boolean> {
    return true;
  }

  async getClaims(userId?: string) {
    if (userId) {
      return this.claimModel.find({ userId }).exec();
    }
    return this.claimModel.find().exec();
  }
}
