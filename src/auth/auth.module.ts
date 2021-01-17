import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { StravaStrategy } from './strava.strategy';
import { UserSchema } from '../schemas/user.schema';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  providers: [AuthService, UserService, StravaStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
