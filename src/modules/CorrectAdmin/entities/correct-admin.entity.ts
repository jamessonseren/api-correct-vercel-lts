import { randomUUID } from 'crypto'
import { PasswordBcrypt } from '../../../crypto/password.bcrypt'
import { CustomError } from '../../../errors/custom.error'


export type ICorrectAdmin = {
    uuid?:string
    name: string
    email: string
    userName: string
    password: string
    isAdmin: boolean
}

export class CorrectAdminEntity {
    private _uuid: string
    private _name: string
    private _email: string
    private _userName: string
    private _password: string
    private _isAdmin: boolean


    constructor(props: ICorrectAdmin) {

        this._uuid = props.uuid ? props.uuid : randomUUID()
        this._name = props.name
        this._email = props.email
        this._userName = props.userName
        this._password = props.password
        this._isAdmin = props.isAdmin
        this.validate()
    }

    validate() {
        if (!this._userName) throw new CustomError("Username is required!", 400)
        if (!this._password) throw new CustomError("Password is required!", 400)
        if (!this._email) throw new CustomError("Email is required!", 400)
    }

    get uuid(): string {
        return this._uuid;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email
    }

    get isAdmin(): boolean {
        return this._isAdmin
    }

    get userName(): string {
        return this._userName
    }

    get password(): string{
        return this._password
    }
    
    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeEmail(email: string) {
        this._email = email;
        this.validate();
    }

    async changePassword(password: string) {
        const bcrypt = new PasswordBcrypt()
        const passwordHash = await bcrypt.hash(password)

        this._password = passwordHash;
        this.validate();
    }

    static async create(data: ICorrectAdmin) {

        const bcrypt = new PasswordBcrypt()
        const passwordHash = await bcrypt.hash(data.password)

        data.password = passwordHash

        const correctAdmin = new CorrectAdminEntity(data)
        return correctAdmin
    }
}