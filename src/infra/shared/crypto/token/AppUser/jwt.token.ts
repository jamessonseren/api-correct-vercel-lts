import { sign } from 'jsonwebtoken'
import { verify } from 'jsonwebtoken';

import { createHmac } from 'crypto'

import { IAppUserToken, TokenAppUser } from './token';
import { AppUserByUserEntity } from '../../../../../modules/AppUser/AppUserManagement/entities/create-user-by-user/appuser-by-user.entity';

export class AppUserJWToken implements IAppUserToken{
    private TOKEN_SECRET = process.env.SECRET_KEY_TOKEN_APP_USER|| ''

    private TOKEN_SECRET_CRYPTO = createHmac('sha256', this.TOKEN_SECRET).digest('base64')

    create({ uuid }: AppUserByUserEntity): string {
        const token = sign({
            appUser: {
                uuid
            }
        }, this.TOKEN_SECRET_CRYPTO, {
            subject: uuid,
            expiresIn: '1D'
        })

        return token
    }
    validate(token: string): TokenAppUser | null {
        try {
            const appUserToken = verify(token, this.TOKEN_SECRET_CRYPTO) as TokenAppUser
            return appUserToken

        } catch (err) {
            return null
        }
    }

}