import { CustomError } from "../../../../../errors/custom.error";
import { ICompanyUserRepository } from "../../repositories/company-user.repository";

export class GetUsersUsecase {
    constructor(
        private companyUserRepository: ICompanyUserRepository
    ) {}

    async execute(business_info_uuid: string){

        if(!business_info_uuid) throw new CustomError("Business document required", 400)

        const getUsers = await this.companyUserRepository.findUsers(business_info_uuid)
        if(!getUsers) throw new CustomError("Users not found", 400)
        
        return getUsers
    }
}