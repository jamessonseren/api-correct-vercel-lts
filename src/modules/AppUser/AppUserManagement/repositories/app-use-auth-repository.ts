import { AppUserAuthResponse, AppUserAuthResponseAuthentication } from "../../app-user-dto/app-user.dto"


export interface IAppUserAuthRepository{
    findByDocumentAuth(document: string): Promise<AppUserAuthResponseAuthentication | null>
    findByDocument(document: string): Promise<AppUserAuthResponse | null>
    findById(id: string): Promise<AppUserAuthResponse | null>
}