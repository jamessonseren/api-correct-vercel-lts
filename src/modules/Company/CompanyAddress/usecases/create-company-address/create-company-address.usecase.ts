import { CustomError } from "../../../../../errors/custom.error";
import { ICompanyDataRepository } from "../../../CompanyData/repositories/company-data.repository";
import { CompanyAddressEntity, CompanyAddressProps } from "../../entities/company-address.entity";
import { ICompanyAddressRepository } from "../../repositories/company-address.repository";

export class CreateCompanyAddressUsecase{
    constructor(
        private companyAddressRepository: ICompanyAddressRepository,
    ){}

    async execute(data: CompanyAddressProps){

        const companyAddress = CompanyAddressEntity.create(data)

        const createCompanyAddress = await this.companyAddressRepository.save(companyAddress)

        return createCompanyAddress

    }
}