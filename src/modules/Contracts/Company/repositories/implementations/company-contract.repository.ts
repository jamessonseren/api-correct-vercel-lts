import { CompanyContractEntity } from "../../entities/company-contract.entity";

export interface ICompanyContractRepository{
    findById(uuid: string): Promise<CompanyContractEntity | null>
    save(data: CompanyContractEntity, business_info_uuid: string): Promise<CompanyContractEntity>
}