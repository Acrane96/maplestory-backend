export class CreateEventDto {
  readonly name: string;
  readonly description: string;
  readonly condition: string;
  readonly startAt: Date;
  readonly endAt: Date;
}
export class CreateRewardDto {
  readonly eventId: string;
  readonly type: string;
  readonly amount: number;
  readonly detail?: string;
}
export class CreateClaimDto {
  readonly userId: string;
  readonly eventId: string;
  readonly rewardId: string;
}
