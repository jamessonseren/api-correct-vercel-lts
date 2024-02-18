import { CustomError } from "../../../../../errors/custom.error";
import { ICompanyContractRepository } from "../../repositories/implementations/company-contract.repository";

export class FindCompanyContractsUsecase {
    constructor(
        private companyContractsRepository: ICompanyContractRepository
    ){}

    async execute(business_info_uuid: string){

        if(!business_info_uuid) throw new CustomError("Business Info UUID is required", 400)
        
        const findContracts = await this.companyContractsRepository.findManyByBusinessId(business_info_uuid)
        if(!findContracts) throw new CustomError("Contracts not found", 404)

        return findContracts

    }
}