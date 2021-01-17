import { Document } from 'mongoose';

export interface IUser extends Document {
    readonly name: string;
    readonly stravaId: number;
    readonly email: string;
    readonly age: number;
    readonly sex: 'M'|'F';
    readonly accessToken: {iv:string, payload:string};
    readonly refreshToken: {iv:string, payload:string};
}