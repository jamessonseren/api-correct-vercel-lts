import { CustomError } from "../../../../../errors/custom.error";
import { ICompanyUserRepository } from "../../repositories/company-user.repository";

export class GetUsersUsecase {
    constructor(
        private companyUserRepository: ICompanyUserRepository
    ) {}

    async execute(business_document: string){

        if(!business_document) throw new CustomError("Business document required", 403)

        const getUsers = await this.companyUserRepository.findByUsers(business_document)
        if(!getUsers) throw new CustomError("Users not found", 400)

        return getUsers
    }
}