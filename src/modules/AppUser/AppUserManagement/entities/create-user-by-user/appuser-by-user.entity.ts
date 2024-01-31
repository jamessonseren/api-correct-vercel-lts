import { randomUUID } from 'crypto'
import { CustomError } from '../../../../../errors/custom.error'
import { PasswordBCrypt } from '../../../../../infra/shared/crypto/password.bcrypt'

export type IAuthAppUserProps = {
    user_info_uuid: string
    document: string
    password: string
}
export class AppUserByUserEntity{
    uuid: string
    user_info_uuid: string | null
    document: string
    password: string

    private constructor(props: IAuthAppUserProps){
        
        this.uuid = randomUUID()
        this.user_info_uuid = props.user_info_uuid
        this.document = props.document
        this.password = props.password
    }
    
    static async create(data: IAuthAppUserProps){
        
        if(!data.document) throw new CustomError("Document is required", 400)
        if(!data.password) throw new CustomError("Password is required", 400)
        
        const bcrypt = new PasswordBCrypt()
        const passwordHash = await bcrypt.hash(data.password)

        data.password = passwordHash
        
        const appUser = new AppUserByUserEntity(data)
        return appUser
    }
}