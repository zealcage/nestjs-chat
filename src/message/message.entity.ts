import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as mongooseSchema } from 'mongoose';
import { User } from '../user/user.entity';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({
    required: [true, 'Message is required'],
  })
  message: string;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: 'users' }],
    required: [true, 'Sender is required'],
  })
  sender: User;

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: 'users' }],
    required: [true, 'Recipient is required'],
  })
  recipient: User;

  @Prop({
    default: false
  })
  seen: boolean;

  @Prop({
    required: [true, 'Timestamp is required'],
    default: Date.now(),
  })
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);