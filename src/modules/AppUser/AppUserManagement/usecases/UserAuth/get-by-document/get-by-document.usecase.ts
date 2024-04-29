import { CustomError } from "../../../../../../errors/custom.error";
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository";

export class GetByDocumentUsecase{
    constructor(
        private appUserRepository: IAppUserAuthRepository
    ){}

    async execute(document: string){
        if(!document) throw new CustomError("Document is required", 400)

        const getUser = await this.appUserRepository.findByDocument(document)
        if(!getUser) throw new CustomError("User not found", 404)

        return getUser
    }
}