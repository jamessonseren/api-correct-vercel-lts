import { CustomError } from "../../../../../errors/custom.error";
import { ICompanyUserRepository } from "../../repositories/company-user.repository";

export class DeleteUserByAdminUsecase{
    constructor(
        private companyUserRepository: ICompanyUserRepository
    ){}

    async execute(user_id: string){

        const findUser = await this.companyUserRepository.findById(user_id)
        if(!findUser) throw new CustomError("Unable to delete user", 400)

        const deleteUser = await this.companyUserRepository.deleteByAdminById(user_id)

        return deleteUser
    }
}