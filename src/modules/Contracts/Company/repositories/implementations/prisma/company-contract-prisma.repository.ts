import { prismaClient } from "../../../../../../infra/databases/prisma.config";
import { CompanyContractEntity } from "../../../entities/company-contract.entity";
import { ICompanyContractRepository } from "../company-contract.repository";

export class CompanyContractPrismaRepository implements ICompanyContractRepository{
    async findById(uuid: string): Promise<CompanyContractEntity | null> {
        const contract = await prismaClient.contractInfo.findUnique({
            where:{
                uuid
            }
        })

        return contract
    }
    async save(data: CompanyContractEntity): Promise<CompanyContractEntity> {
        const contract = await prismaClient.contractInfo.create({
            data:{
                uuid: data.uuid,
                assigned_at: data.assigned_at,
                content: data.content,
                branch_info_uuid: data.branch_info_uuid,
                name: data.name,
                version: data.version
            }
        })

        return contract
    }

}