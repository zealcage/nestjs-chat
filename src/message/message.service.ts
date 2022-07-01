import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.entity';
import { User } from '../user/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatService {

    constructor(@InjectModel(Message.name) private messagesModel: Model<MessageDocument>, private userService: UserService) { }

    //  Get chat when user get online
    async getChat(user: User, offset: number): Promise<Message[]> {
        return await this.messagesModel.find({ $or: [{ sender: user._id }, { recipient: user._id }] }).lean().skip(offset).limit(100).sort({ "timestamp": -1 })
    }

    // Create Message for each friend of the sender and save it to the database.
    async saveMessage(message: string, senderId: string): Promise<void> {
        const userData = await this.userService.getUserById(senderId)
        const newMessages = []
        for (let i = 0; i < userData.friends.length; i++) {
            const friend = userData.friends[i];
            let msg = new Message()
            msg.sender = userData
            msg.recipient = friend;
            msg.message = message
            newMessages.push(msg)
        }
        await this.messagesModel.insertMany(newMessages)
        return;
    }

    //  User joins friends rooms
    joinFriendsRooms(friends: Array<any>, socket: any) {
        friends.forEach(friend => {
            socket.join(friend.toString())
        });
    }

    //  Send status notification to friends through self room.
    sendStatusNotificationToFriends(socket: any, status: string) {
        socket.broadcast.to(socket.userId).emit('userStatus', { userId: socket.userId, status: status });
    }
}