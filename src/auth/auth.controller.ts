import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common';
import { StravaAuthGuard } from './stravaAuth.guard';
import { JwtAuthGuard } from './jwtAuth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    
    @Get('strava')
    @UseGuards(StravaAuthGuard)
    async login() {
        
    }

    @Get('strava/callback')
    @UseGuards(StravaAuthGuard)
    loginCallback(@Req() req, @Res() res: Response) {
        const { user } = req;
        res.redirect('/?token=' + user.jwt)
    }

    @Get('protected')
    @UseGuards(JwtAuthGuard)
    protectedResource()
    {
        return 'JWT is working!';
    }

}
