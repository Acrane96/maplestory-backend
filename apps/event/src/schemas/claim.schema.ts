import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

const ClaimStatusEnum = {
  IN_PROGESS: 'IN_PROGESS',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
} as const;

export type ClaimStatus = typeof ClaimStatusEnum[keyof typeof ClaimStatusEnum];

@Schema()
export class Claim extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Event' })
  eventId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Reward' })
  rewardId: Types.ObjectId;

  @Prop({ required: true, enum: ClaimStatusEnum })
  status: ClaimStatus;

  @Prop({ required: true })
  requestedAt: Date;

  @Prop()
  reason: string;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
