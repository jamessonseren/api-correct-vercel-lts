import { CustomError } from "../../../../../errors/custom.error";
import { CompanyAddressEntity, CompanyAddressProps } from "../../entities/company-address.entity";
import { ICompanyAddressRepository } from "../../repositories/company-address.repository";

export class CreateCompanyAddressUsecase{
    constructor(
        private companyAddressRepository: ICompanyAddressRepository,
    ){}

    async execute(addressData: CompanyAddressProps){

        const companyAddress = await CompanyAddressEntity.create(addressData)

        const createCompanyAddress = await this.companyAddressRepository.save(companyAddress)
                
        return createCompanyAddress

    }
}