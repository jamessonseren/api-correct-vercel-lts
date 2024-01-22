import { randomUUID } from 'crypto'
import { PasswordBcrypt } from '../../../crypto/password.bcrypt'
import { CustomError } from '../../../errors/custom.error'


type ICorrectAdmin = {
    name: string
    email: string
    userName: string
    password: string
    isAdmin: boolean
}

export class CorrectAdminEntity {
    uuid: string
    name: string
    email: string
    userName: string
    password: string
    isAdmin: boolean


    private constructor(props: ICorrectAdmin){

        this.uuid = randomUUID()
        this.name = props.name
        this.email = props.email
        this.userName = props.userName
        this.password = props.password
        this.isAdmin = props.isAdmin
        
        
    }
    
    static async create(data: ICorrectAdmin){
        if(!data.userName) throw new CustomError("Username/password is required!", 412)
        if(!data.password) throw new CustomError("Username/password is required!", 412)
        if(!data.email) throw new CustomError("Email is required!", 412)
       
        const bcrypt = new PasswordBcrypt()
        const passwordHash = await bcrypt.hash(data.password)

        data.password = passwordHash

        const correctAdmin = new CorrectAdminEntity(data)
        return correctAdmin
    }
}