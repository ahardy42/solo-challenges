import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    age: number;

    @Prop({required: true})
    sex: 'male'|'female';
}

export const UserSchema = SchemaFactory.createForClass(User);