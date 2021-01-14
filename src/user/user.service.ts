import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from '../schemas/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>
    ) { }

    async show(): Promise<UserDocument[]> {
        return this.userModel.find({}).exec()
    }

    async find(id): Promise<UserDocument> {
        return this.userModel.findById(id).exec()
    }

    async create(user): Promise<UserDocument> {
        const newUser = await this.userModel.create(user);
        return newUser.save()
    }

    async edit(id, update): Promise<UserDocument> {
        const editedUser = await this.userModel.findByIdAndUpdate(id, update, {new: true});
        return editedUser;
    }

    async delete(id): Promise<UserDocument> {
        const deleted = await this.userModel.findByIdAndDelete(id);
        return deleted 
    }
}
