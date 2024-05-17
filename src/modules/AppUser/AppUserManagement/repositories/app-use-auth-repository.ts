import { AppUserAuthRequest, AppUserAuthResponse, AppUserAuthResponseAuthentication, UpdateAppUserRequest } from "../../app-user-dto/app-user.dto"
import { AppUserAuthSignUpEntity } from "../entities/app-user-auth.entity"


export interface IAppUserAuthRepository{
    // saveOrUpdate(data: AppUserAuthSignUpEntity): Promise<void>
    save(data: AppUserAuthSignUpEntity): Promise<void>
    update(data: AppUserAuthRequest): Promise<void>
    findByDocumentAuth(document: string): Promise<AppUserAuthResponseAuthentication | null>
    findByDocument(document: string): Promise<AppUserAuthResponse | null>
    findById(id: string): Promise<AppUserAuthResponse | null>
    findByEmail(email: string): Promise<AppUserAuthResponse | null>

}