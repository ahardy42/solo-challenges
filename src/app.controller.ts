import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request, NextFunction } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('*')
  root(@Res() res: Response, @Req() req:Request, @Next() next:NextFunction): void {
    
    // here you can check if the requested path is your api endpoint, if that's the case then we have to return next()
    if (req.path.includes('api') || req.path.includes('auth')) {
      return next();
    }
    
    // change the path to the correct html page path in your project
    res.sendFile(join(__dirname, '..', 'client/build/index.html'));
  }

}
