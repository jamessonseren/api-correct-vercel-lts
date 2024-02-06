import { AppUserAuthResponseAuthentication } from "../../../../../modules/AppUser/app-user-dto/app-user.dto"

export type TokenAppUser = {
    sub: string
}
export interface IAppUserToken{
    create(appUser: AppUserAuthResponseAuthentication): string
    validate(token: string): TokenAppUser | null
}