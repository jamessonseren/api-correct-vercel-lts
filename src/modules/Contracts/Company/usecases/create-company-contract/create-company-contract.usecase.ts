import { newDateF } from "../../../../../utils/date";
import { CompanyContractEntity, CompanyContractProps } from "../../entities/company-contract.entity";
import { ICompanyContractRepository } from "../../repositories/implementations/company-contract.repository";

export class CreateCompanyContractUsecase {
    constructor(
        private companyContractRepository: ICompanyContractRepository
    ){}

    async execute(data: CompanyContractProps){

        data.assigned_at = newDateF()

        const contract = await CompanyContractEntity.create(data)

        const createContract = await this.companyContractRepository.save(contract)

        return createContract
    }
}