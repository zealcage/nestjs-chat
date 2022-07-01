import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ChatModule, MongooseModule.forRoot('mongodb://mongodb:27017/messenger')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
