import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { UserDocument, User } from './user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {
        // This function creates 4 users for testing. If you want, you can uncommment and run this line.
        //this.createDefaultUsers()
    }

    // Create 4 users for testing
    async createDefaultUsers() {
        try {
            await this.usersModel.insertMany([{
                _id: "62bc92718bd14443f27a8534",
                username: "user1",
                friends: ["62bc92718bd14443f27a8535", "62bc92718bd14443f27a8536", "62bc92718bd14443f27a8537"]
            },
            {
                _id: "62bc92718bd14443f27a8535",
                username: "user2",
                friends: ["62bc92718bd14443f27a8534", "62bc92718bd14443f27a8537"]
            }, {
                _id: "62bc92718bd14443f27a8536",
                username: "user3",
                friends: ["62bc92718bd14443f27a8534"]
            }, {
                _id: "62bc92718bd14443f27a8537",
                username: "user4",
                friends: ["62bc92718bd14443f27a8534", "62bc92718bd14443f27a8535"]
            }])
        } catch (error) {
            // console.log(error)
        }

    }
    //  Get user data by username
    async getUser(username: string): Promise<User> {
        return await this.usersModel.findOne({ username: username }).lean()
    }
    //  Get user data by user id
    async getUserById(userId: string): Promise<User> {
        return await this.usersModel.findById(userId).lean()
    }
}