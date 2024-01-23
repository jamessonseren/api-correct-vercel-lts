import { CustomError } from "../../../../../errors/custom.error";
import { CompanyUserEntity} from "../../entities/company-user.entity";
import { ICompanyUserRepository } from "../../repositories/company-user.repository";

export class UpdateUserByAdminUsecase{
    constructor(
        private companyUserRepository: ICompanyUserRepository
    ){}

    async execute(data: CompanyUserEntity){
        //check if user exists
        const findUser = await this.companyUserRepository.findById(data.uuid)
        if(!findUser) throw new CustomError("User not found", 400)

        if(findUser.business_document !== data.business_document) throw new CustomError("Admin is not allowed to update this user", 403)
        data.uuid = findUser.uuid

        //update user
        const updateUser = await this.companyUserRepository.updateUser(data)

        return updateUser
    }
}