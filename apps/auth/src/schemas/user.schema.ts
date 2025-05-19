import { UserRole, UserRoleEnum } from '@app/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ type: String, enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
