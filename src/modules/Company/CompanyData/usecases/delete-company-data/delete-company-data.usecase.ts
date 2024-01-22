import { ICompanyDataRepository } from "../../repositories/company-data.repository";

export class DeleteCompanyDataByCorrectUsecase{
    constructor(
        private companyDataRepository: ICompanyDataRepository
    ){}

    async execute(business_id: string){

        const deleteCompanyData = await this.companyDataRepository.deleteById(business_id)

        return deleteCompanyData

    }
}