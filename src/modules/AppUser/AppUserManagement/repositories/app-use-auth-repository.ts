import RepositoryInterface from "../../../../@shared/domain/repository/repository-interface"
import { AppUserAuthRequest, AppUserAuthResponse, AppUserAuthResponseAuthentication, OutputfindByDocumentDTO, UpdateAppUserRequest } from "../../app-user-dto/app-user.dto"
import { AppUserAuthSignUpEntity } from "../entities/app-user-auth.entity"


export interface IAppUserAuthRepository extends RepositoryInterface<AppUserAuthSignUpEntity>{
    findByDocument(document: string): Promise<AppUserAuthSignUpEntity>
    findByEmail(email: string): Promise<AppUserAuthSignUpEntity>

}