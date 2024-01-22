import { sign } from 'jsonwebtoken'
import { verify } from 'jsonwebtoken';

import { createHmac } from 'crypto'

import { CompanyUserEntity } from '../../../../../modules/Company/CompanyUser/entities/company-user.entity';
import { TokenCompanyAdmin, ICompanyAdminToken  } from '../CompanyAdmin/token';


export class CompanyAdminJWToken implements ICompanyAdminToken{
    private TOKEN_SECRET = process.env.SECRET_KEY_TOKEN_COMPANY_ADMIN || ''

    private TOKEN_SECRET_CRYPTO = createHmac('sha256', this.TOKEN_SECRET).digest('base64')

    create({ uuid }: CompanyUserEntity): string {
        const token = sign({
            
        }, this.TOKEN_SECRET_CRYPTO, {
            subject: uuid,
            expiresIn: '1D'
        })

        return token
    }
    validate(token: string): TokenCompanyAdmin | null {
        try {
            const tokenAdmin = verify(token, this.TOKEN_SECRET_CRYPTO) as TokenCompanyAdmin
            return tokenAdmin

        } catch (err) {
            return null
        }
    }

}