import { AppUserAuthResponse, AppUserAuthResponseAuthentication, UserValidation, UserValidationUpdate } from "../../app-user-dto/app-user.dto"


export interface IAppUserValidationDocumentsRepository{
    findById(id: string): Promise<UserValidation | null>
    updateDocuments(data: UserValidationUpdate): Promise<UserValidation>
    
}