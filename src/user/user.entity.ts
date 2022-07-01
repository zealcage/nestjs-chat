import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({})
  _id: mongooseSchema.Types.ObjectId;

  @Prop({
    required: [true, 'Username is required'],
  })
  username: string;

  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'users' }] })
  friends: Array<User>;

  @Prop({
    default: Date.now(),
  })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);