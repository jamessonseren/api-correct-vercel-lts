import { CustomError } from "../../../../../errors/custom.error";
import { ICompanyDataRepository } from "../../../CompanyData/repositories/company-data.repository";
import { ICompanyAddressRepository } from "../../repositories/company-address.repository";

export class GetCompanyAddressUsecase{
    constructor(
        private companyAddressRepository: ICompanyAddressRepository,
    ){}

    async execute(address_id: string){


        const getCompanyAddress = await this.companyAddressRepository.findById(address_id)
        if(!getCompanyAddress) throw new CustomError("Unable to find company address", 400)

        return getCompanyAddress
    }
}