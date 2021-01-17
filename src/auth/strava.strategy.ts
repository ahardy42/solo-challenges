import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strava';
import { config } from 'dotenv';
import { AuthService } from './auth.service';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class StravaStrategy extends PassportStrategy(Strategy, 'strava') {
    constructor(private authService: AuthService) {
        super({
            clientID: process.env.STRAVA_CLIENT_ID,
            clientSecret: process.env.STRAVA_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/auth/strava/callback',
            scope: ['read,activity:read']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any> {
        try {

            const info = {
                name: profile.displayName,
                stravaId: profile.id,
                sex: profile._json.sex
            }

            const data = {
                ...info,
                accessToken: this.authService.encryptToken(accessToken),
                refreshToken: this.authService.encryptToken(refreshToken)
            }
            const user = this.authService.validateOAuthLogin(data)
            done(null, user)
        } catch (error) {
            done(error, false)
        }
    }
}

