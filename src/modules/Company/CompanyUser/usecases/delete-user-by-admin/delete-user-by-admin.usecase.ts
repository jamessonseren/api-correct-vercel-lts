import { CustomError } from "../../../../../errors/custom.error";
import { ICompanyUserRepository } from "../../repositories/company-user.repository";

export class DeleteUserByAdminUsecase{
    constructor(
        private companyUserRepository: ICompanyUserRepository
    ){}

    async execute(user_id: string, business_document: string){

        const findUser = await this.companyUserRepository.findById(user_id)
        if(!findUser) throw new CustomError("Unable to delete user", 400)

        if(findUser.business_document !== business_document) throw new CustomError("Admin is not allowed to delete this user", 403)

        const deleteUser = await this.companyUserRepository.deleteByAdminById(user_id)

        return deleteUser
    }
}