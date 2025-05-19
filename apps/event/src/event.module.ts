import { Module } from '@nestjs/common';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '@app/common';
import { Event, EventSchema } from './schemas/event.schema';
import { Reward, RewardSchema } from './schemas/reward.schema';
import { Claim, ClaimSchema } from './schemas/claim.schema';
import { RewardController } from './controllers/reward.controller';
import { ClaimController } from './controllers/claim.controller';
import { ClaimService } from './services/claim.service';
import { RewardService } from './services/reward.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Reward.name, schema: RewardSchema },
      { name: Claim.name, schema: ClaimSchema },
    ]),
    CommonModule
  ],
  controllers: [EventController, RewardController, ClaimController],
  providers: [EventService, RewardService, ClaimService],
})
export class EventModule {}
