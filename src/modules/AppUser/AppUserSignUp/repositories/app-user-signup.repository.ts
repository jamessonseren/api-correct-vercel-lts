import { AppUserAuthResponseAuthentication } from "../../app-user-dto/app-user.dto";
import { AppUserSignUpEntity } from "../entities/app-user-signup.entity";

export interface IAppUserSignupRepository{
    signUpUser(data: AppUserSignUpEntity): Promise<void>
    findByDocumentUserAuth(document: string): Promise<AppUserAuthResponseAuthentication | null>
}