import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
const crypto = require('crypto');
config();

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    private readonly SECRET_KEY = process.env.SECRET_KEY
    private readonly CRYPTO_SECRET_KEY = process.env.CRYPTO_SECRET_KEY

    async validateOAuthLogin(obj) {
        try {
            
            let user = await this.userService.findByStravaId(obj.stravaId);

            if (!user) {
               user = await this.userService.create(obj)
            }

            const payload = {
                id: user._id
            }

            const jwt: string = sign(payload, this.SECRET_KEY, { expiresIn: 3600})
            return {
                jwt
            }
            
        } catch (error) {
            throw new InternalServerErrorException('validateOAuthLogin', error.message)
        }
    }

    encryptToken(token:string) {
        const algorithm = 'aes-256-ctr';
        const iv = crypto.randomBytes(16);
        const ciph = crypto.createCipheriv(algorithm, this.CRYPTO_SECRET_KEY, iv);
        const encrypted = Buffer.concat([ciph.update(token), ciph.final()])
        return {
            iv: iv.toString('hex'),
            payload: encrypted.toString('hex')
        }
    }

    decryptToken(hash:{iv:string,payload:string}) {
        const { iv, payload } = hash;
        const algorithm = 'aes-256-ctr';
        const decipher = crypto.createDecipheriv(algorithm, this.CRYPTO_SECRET_KEY, Buffer.from(iv, 'hex'));
        const decrypted = Buffer.concat([decipher.update(Buffer.from(payload, 'hex')), decipher.final()]);

        return decrypted.toString();
    }
}
