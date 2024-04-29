import { randomUUID } from 'crypto'
import { CustomError } from '../../../../errors/custom.error'
import { Status, UserDocumentValidationStatus } from '@prisma/client'
import { PasswordBCrypt } from '../../../../infra/shared/crypto/password.bcrypt'
import { newDateF } from '../../../../utils/date'

export type AppUserAuthProps = {
    user_info_uuid: string | null,
    document: string,
    email: string,
    password: string,
    created_at: string | null,

}
export class AppUserAuthSignUpEntity {
    uuid: string
    user_info_uuid: string | null
    document: string
    email: string
    password: string
    created_at: string | null

    private constructor(props: AppUserAuthProps) {

        //UserAddress table
        this.uuid = randomUUID()
        this.user_info_uuid = props.user_info_uuid
        this.document = props.document
        this.email = props.email
        this.password = props.password
        this.created_at = newDateF(new Date)
    }

    static async create(data: AppUserAuthProps) {

        //Validate if necessary fields are present
        if (!data.document) throw new CustomError("Document is required", 400)
        if (!data.password) throw new CustomError("Password is required", 400)
        if (!data.email) throw new CustomError("Email is required", 400)

        //Validate field types
        if (typeof data.document !== 'string') throw new CustomError("Document must be string type", 400)
        if (typeof data.password !== 'string') throw new CustomError("Password must be string type", 400)
        if (typeof data.email !== 'string') throw new CustomError("Email must be string type", 400)

        const bcrypt = new PasswordBCrypt()
        const passwordHash = await bcrypt.hash(data.password)

        data.password = passwordHash

        const appUserRegister = new AppUserAuthSignUpEntity(data)
        return appUserRegister
    }
}