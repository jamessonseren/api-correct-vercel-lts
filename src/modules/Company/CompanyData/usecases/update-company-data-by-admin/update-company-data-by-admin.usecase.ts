import { CustomError } from "../../../../../errors/custom.error";
import { CompanyDataEntity } from "../../entities/company-data.entity";
import { ICompanyDataRepository } from "../../repositories/company-data.repository";

export class UpdateCompanyDataByAdminUsecase {
    constructor(
        private companyDataRepository: ICompanyDataRepository,

    ){}

    async execute(data: CompanyDataEntity){
        if(!data.uuid) throw new CustomError("Company Data Id is required", 403)
        // console.log({data})
        //check if company data exists
        const findData = await this.companyDataRepository.findById(data.uuid)
        if(!findData) throw new CustomError("Company Data not found", 400)

        const updateCompanyData = await this.companyDataRepository.update(data)

        return updateCompanyData
    }
}