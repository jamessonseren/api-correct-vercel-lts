import { CustomError } from "../../../../../errors/custom.error";
import { ICompanyDataRepository } from "../../../CompanyData/repositories/company-data.repository";
import { CompanyUserEntity, CompanyUserProps } from "../../entities/company-user.entity";
import { ICompanyUserRepository } from "../../repositories/company-user.repository";

export class CreateCompanyUserByAdminUsecase {
    constructor(
        private companyUserRepository: ICompanyUserRepository,
    ) { }

    async execute(data: CompanyUserProps, companyAdminId: string) {

        //find companyAdmin by id
        const findAdmin = await this.companyUserRepository.findById(companyAdminId)
        if (!findAdmin) throw new CustomError("Admin not found", 400)
        
        //check if admin is active
        if (findAdmin.status !== 'active') throw new CustomError("Admin is not allowed to create users", 403)
        
        // const findBusinessInfo = await this.businessInfoRepository.findById(findAdmin.business_info_uuid)
        // if(!this.businessInfoRepository) throw new CustomError("Business Info not found", 404)

        //check if username already exists
        const findByUsername = await this.companyUserRepository.findByBusinessIdAndUsername(findAdmin.business_info_uuid, data.user_name)
        if(findByUsername) throw new CustomError("User name already registered", 409)
        
        //if admin is found, set same business info id to users
        data.business_info_uuid = findAdmin.business_info_uuid
        data.status = findAdmin.status
        //by default user is not admin, so there is no need to set data.is_admin = false

        //by default, permissios is 'all'. So user must not have this property.
        if (data.permissions.includes('all')) throw new CustomError("Please, select a permission type", 400)

        const user = await CompanyUserEntity.create(data)

        const createUser = await this.companyUserRepository.saveUser(user)

        return createUser
    }
}