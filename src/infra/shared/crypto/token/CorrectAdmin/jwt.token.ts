import { sign } from 'jsonwebtoken'
import { verify } from 'jsonwebtoken';

import { createHmac } from 'crypto'

import { CorrectAdminEntity } from '../../../../../modules/CorrectAdmin/entities/correct-admin.entity';
import { IToken, TokenAdmin } from "./token";

export class JWTToken implements IToken {
    private TOKEN_SECRET = process.env.SECRET_KEY_TOKEN_ADMIN || ''

    private TOKEN_SECRET_CRYPTO = createHmac('sha256', this.TOKEN_SECRET).digest('base64')

    create({ userName, uuid, email }: CorrectAdminEntity): string {
        const token = sign({
            admin: {
                userName,
                uuid: uuid.uuid,
                email
            }
        }, this.TOKEN_SECRET_CRYPTO, {
            subject: uuid.uuid,
            expiresIn: '1D'
        })

        return token
    }

    validate(token: string): TokenAdmin | null {

        try {
            const tokenAdmin = verify(token, this.TOKEN_SECRET_CRYPTO) as TokenAdmin
            return tokenAdmin

        } catch (err) {
            return null
        }
    }

}