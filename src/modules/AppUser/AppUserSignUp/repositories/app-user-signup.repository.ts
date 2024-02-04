import { UserAuthResponse, UserInfoResponse } from "../app-user-dto/app-user-dto";
import { AppUserSignUpEntity } from "../entities/app-user-signup.entity";

export interface IAppUserSignupRepository{
    signUpUser(data: AppUserSignUpEntity): Promise<void>
    findByDocumentUserAuth(document: string): Promise<UserAuthResponse | null>
    findByDocumentUserInfo(document: string): Promise<UserInfoResponse | null>
    findByEmailUserInfo(email: string): Promise<UserInfoResponse | null>
}