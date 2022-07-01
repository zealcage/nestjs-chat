import { Module } from '@nestjs/common';
import { Message, MessageSchema } from './message.entity';
import { User, UserSchema } from '../user/user.entity';
import { ChatGateway } from './message.gateway';
import { ChatService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [ChatGateway, ChatService, UserService]
})
export class ChatModule { }