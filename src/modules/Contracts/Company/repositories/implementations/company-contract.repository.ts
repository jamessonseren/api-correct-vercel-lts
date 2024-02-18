import { BusinessContract } from "@prisma/client";
import { CompanyContractEntity } from "../../entities/company-contract.entity";
import { ContractsInfoResponse } from "../../../contracts-dto/contracts.dto";

export interface ICompanyContractRepository{
    findById(uuid: string): Promise<ContractsInfoResponse | null>
    findManyByBusinessId(business_info_uuid: string): Promise<BusinessContract[] | null>
    save(data: CompanyContractEntity): Promise<void>
}