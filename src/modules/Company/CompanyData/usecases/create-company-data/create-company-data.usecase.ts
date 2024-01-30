import { CustomError } from "../../../../../errors/custom.error";
import { CompanyDataEntity } from "../../../CompanyData/entities/company-data.entity";
import { ICompanyDataRepository } from "../../../CompanyData/repositories/company-data.repository";

import { CompanyDataRequest } from "../../companyDataDto/company-data.dto";

export class CreateCompanyDataUsecase {
    constructor(
        private companyDataRepository: ICompanyDataRepository,
    ) { }

    async execute(data: CompanyDataRequest) {


        const companyData = await CompanyDataEntity.create(data)
        
        //create Data
        const createData = await this.companyDataRepository.save(companyData)
        
        
        return createData

    }
}