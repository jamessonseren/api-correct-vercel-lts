import { AppUserAuthResponseAuthentication } from "../../../../../modules/AppUser/app-user-dto/app-user.dto"
import { AppUserAuthSignUpEntity } from "../../../../../modules/AppUser/AppUserManagement/entities/app-user-auth.entity"

export type TokenAppUser = {
    sub: string
}
export interface IAppUserToken{
    create(appUser: AppUserAuthSignUpEntity): string
    validate(token: string): TokenAppUser | null
}