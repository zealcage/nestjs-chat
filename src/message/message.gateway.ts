import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { ChatService } from './message.service';
import { UserService } from '../user/user.service';
import { Bind } from '@nestjs/common';

@WebSocketGateway()
export class ChatGateway implements NestGateway {
  constructor(private chatService: ChatService, private userService: UserService) { }

  handleConnection(socket: any, io: any) {
    const query = socket.handshake.query;

    //  Basic authentication is made here, it should be done with JWT but for testing it is easier to keep it like that.
    //  If token is not correct, socket disconnects
    if (query.token !== "xxx")
      return socket.disconnect()

    process.nextTick(async () => {
      //  Get user _id attribute thorough username then set userId in the socket.
      const userData = await this.userService.getUser(query.userName)

      // If user not found close socket
      if (!userData)
        return socket.disconnect()

      socket.userId = userData._id.toString()

      //  Get last messages from database to send them to the user
      socket.emit('unseenChat', await this.chatService.getChat(userData, 0));

      //  Join to the room with self _id. 
      //  Purpose: sending online notification to the user's friends
      socket.join(userData._id.toString())

      //  Join rooms 
      this.chatService.joinFriendsRooms(userData.friends, socket)
      // Send user status online
      this.chatService.sendStatusNotificationToFriends(socket, "online")
    });
  }

  handleDisconnect(socket: any) {
    // Send user status offline
    this.chatService.sendStatusNotificationToFriends(socket, "offline")
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('chat')
  async handleNewMessage(message: string, sender: any) {
    //  Broadcast the message inside the self room. So all friends will see it.
    sender.broadcast.to(sender.userId).emit('newChat', message);

    //  Save message
    await this.chatService.saveMessage(message, sender.userId);
  }
}