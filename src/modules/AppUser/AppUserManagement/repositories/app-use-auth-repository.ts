import { AppUserByUserEntity } from "../entities/create-user-by-user/appuser-by-user.entity"

export type AppUserAuthResponse = {
    uuid: string,
    document: string,
   
}

export type AppUserResponse = {
    uuid: string
    document: string
    password: string
    
}

export interface IAppUserAuthRepository{
    findByCPFAuth(document: string): Promise<AppUserByUserEntity | null>
    findByCPF(document: string): Promise<AppUserAuthResponse | null>
    findById(id: string): Promise<AppUserResponse| null>
    saveNewUser(data: AppUserByUserEntity): Promise<AppUserAuthResponse>
    saveRegisteredUser(data: AppUserByUserEntity): Promise<AppUserAuthResponse>
}