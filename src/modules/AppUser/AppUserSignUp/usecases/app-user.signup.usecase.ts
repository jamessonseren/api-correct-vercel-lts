import { Prisma } from "@prisma/client";
import { CustomError } from "../../../../errors/custom.error";
import { DocumentValidation, ValidationStatus } from "../app-user-dto/app-user-dto";
import { AppUserProps, AppUserSignUpEntity } from "../entities/app-user-signup.entity";
import { IAppUserSignupRepository } from "../repositories/app-user-signup.repository";
import validator from 'validator'

interface DocumentValidationItem {
    id: string;
    name: string;
    image: string; // ou o tipo correto do seu dado
    status: string; // ou o tipo correto do seu dado
}
export class AppUserSignUpUsecase {
    constructor(
        private appUserSingUpRepository: IAppUserSignupRepository
    ) { }

    async execute(data: AppUserProps) {

        //check if app user is already registered
        const findUserByDocument = await this.appUserSingUpRepository.findByDocumentUserAuth(data.document)
        if (findUserByDocument) throw new CustomError("User already has an account", 409)

        if (!validator.isBase64(data.selfie_base64)) {
            throw new CustomError("Invalid base64 format for 'face'", 400);
        }

        if (!validator.isBase64(data.document_front_base64)) {
            throw new CustomError("Invalid base64 format for 'document_front'", 400);
        }

        if (!validator.isBase64(data.document_back_base64)) {
            throw new CustomError("Invalid base64 format for 'document_back'", 400);
        }

        if (!validator.isBase64(data.document_selfie_base64)) {
            throw new CustomError("Invalid base64 format for 'face_and_document_front'", 400);
        }


        //check if email is already registered
        const findUserbyEmail = await this.appUserSingUpRepository.findByEmailUserInfo(data.email)
        if (findUserbyEmail) throw new CustomError("Email is already in use", 409)

        if (!data.selfie_base64) throw new CustomError("Selfie is required", 400)
        if (!data.document_front_base64) throw new CustomError("Document front is required", 400)
        if (!data.document_back_base64) throw new CustomError("Document back is required", 400)
        if (!data.document_selfie_base64) throw new CustomError("Document and selfie is required", 400)


        const appUser = await AppUserSignUpEntity.create(data)
        
        appUser.status = 'pending_validation'

        const createUser = await this.appUserSingUpRepository.signUpUser(appUser)

        return createUser
    //}

    }


}
