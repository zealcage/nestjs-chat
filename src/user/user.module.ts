import { Module } from '@nestjs/common';
import { User, UserSchema } from './user.entity';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [UserService]
})
export class UserModule { }