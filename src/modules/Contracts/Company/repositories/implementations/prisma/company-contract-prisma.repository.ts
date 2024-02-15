import { prismaClient } from "../../../../../../infra/databases/prisma.config";
import { CompanyContractEntity } from "../../../entities/company-contract.entity";
import { ICompanyContractRepository } from "../company-contract.repository";

export class CompanyContractPrismaRepository implements ICompanyContractRepository {
    async findById(uuid: string): Promise<CompanyContractEntity | null> {
        const contract = await prismaClient.contractInfo.findUnique({
            where: {
                uuid
            }
        })

        return contract
    }
    async save(data: CompanyContractEntity, business_info_uuid: string): Promise<void> {

        const [contract, businessInfo] = await prismaClient.$transaction([
            prismaClient.contractInfo.create({
                data: {
                    uuid: data.uuid,
                    assigned_at: data.assigned_at,
                    content: data.content,
                    name: data.name,
                    version: data.version
                }
            }),

            prismaClient.businessInfo.update({
                where:{
                    uuid: business_info_uuid
                },
                data:{
                    contract_info_uuid: data.uuid
                }
            })

        ])



    }

}