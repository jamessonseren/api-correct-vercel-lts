import { CustomError } from "../../../../../errors/custom.error";
import { ICompanyContractRepository } from "../../repositories/implementations/company-contract.repository";

export class FindSingleCompanyContractsUsecase {
    constructor(
        private companyContractsRepository: ICompanyContractRepository
    ){}

    async execute(contract_uuid: string){

        if(!contract_uuid) throw new CustomError("Contract Id is required", 400)
        
        const findContracts = await this.companyContractsRepository.findById(contract_uuid)
        if(!findContracts) throw new CustomError("Contract not found", 404)

        return findContracts

    }
}