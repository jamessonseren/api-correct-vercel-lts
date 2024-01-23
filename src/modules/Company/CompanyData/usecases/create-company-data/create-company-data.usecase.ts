import { CustomError } from "../../../../../errors/custom.error";
import { CompanyDataEntity } from "../../../CompanyData/entities/company-data.entity";
import { ICompanyUserRepository } from "../../../CompanyUser/repositories/company-user.repository";
import { ICompanyDataRepository } from "../../../CompanyData/repositories/company-data.repository";
import { ICorrectAdminRepository } from "../../../../CorrectAdmin/repositories/correct-admin.repository";

import { CompanyDataRequest } from "../../companyDataDto/company-data.dto";

export class CreateCompanyDataUsecase {
    constructor(
        private companyDataRepository: ICompanyDataRepository,
        private companyUserRepository: ICompanyUserRepository,
    ) { }

    async execute(data: CompanyDataRequest) {


        const companyData = await CompanyDataEntity.create(data)
        
        //create Data
        const createData = await this.companyDataRepository.saveOrUpdate(companyData)
        
        
        return createData

    }
}