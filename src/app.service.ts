import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
