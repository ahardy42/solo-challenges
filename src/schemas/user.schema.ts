import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

class EncryptedToken {
    @Prop()
    iv: string

    @Prop()
    payload: string
}

@Schema()
export class User {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    stravaId: number;

    @Prop({default: null})
    email: string;

    @Prop({default: null})
    age: number;

    @Prop({required: true})
    sex: 'M'|'F'

    @Prop({required: true, type: EncryptedToken})
    accessToken: EncryptedToken

    @Prop({required: true, type: EncryptedToken})
    refreshToken: EncryptedToken
}

export const UserSchema = SchemaFactory.createForClass(User);