import { CustomError } from "../../../../../../errors/custom.error";
import { ICompanyUserRepository } from "../../../../../Company/CompanyUser/repositories/company-user.repository";
import { IAppUserInfoRepository } from "../../../repositories/app-user-info.repository";

export class GetUsersByBusinessAdminUsecase{
    constructor(
        private appUsersRepository: IAppUserInfoRepository,
        private businessUserRepository: ICompanyUserRepository

    ){}

    async execute(business_user_uuid: string){

        if(!business_user_uuid) throw new CustomError("Business user uuid is required", 400)
            
        //get business user
        const businessUser = await this.businessUserRepository.findById(business_user_uuid)
        if(!businessUser) throw new CustomError("Unauthorized access", 401)

        //find employees
        const employees = await this.appUsersRepository.findManyByBusiness(businessUser.business_info_uuid)
        
        return employees
    }
}