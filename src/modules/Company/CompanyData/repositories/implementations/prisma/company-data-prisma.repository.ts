import { prismaClient } from "../../../../../../infra/databases/prisma.config";
import { CompanyDataEntity } from "../../../../CompanyData/entities/company-data.entity";
import { ICompanyDataRepository } from "../../../../CompanyData/repositories/company-data.repository";


export class CompanyDataPrismaRepository implements ICompanyDataRepository {



    async saveOrUpdate(data: CompanyDataEntity): Promise<CompanyDataEntity> {
        const companyData = await prismaClient.businessInfo.upsert({
            where: {
                uuid: data.uuid
            },
            create: {
                uuid: data.uuid,
                address_uuid: data.address_uuid,
                contract_info_uuid: data.contract_info_uuid,
                fantasy_name: data.fantasy_name,
                corporate_reason: data.corporate_reason,
                document: data.document,
                classification: data.classification,
                colaborators_number: data.colaborators_number,
                phone_1: data.phone_1,
                phone_2: data.phone_2,
                business_type: data.business_type
            },
            update: {
                address_uuid: data.address_uuid,
                contract_info_uuid: data.contract_info_uuid,
                fantasy_name: data.fantasy_name,
                corporate_reason: data.corporate_reason,
                document: data.document,
                classification: data.classification,
                colaborators_number: data.colaborators_number,
                phone_1: data.phone_1,
                phone_2: data.phone_2,
                business_type: data.business_type
            }
        })


        return companyData
    }
    async findByDocument(document: string): Promise<CompanyDataEntity | null> {
        const companyData = await prismaClient.businessInfo.findUnique({
            where: {
                document
            }
        })

        return companyData
    }

    async findById(id: string): Promise<CompanyDataEntity | null> {
        const companyData = await prismaClient.businessInfo.findUnique({
            where: {
                uuid: id
            }
        })

        return companyData
    }

    

    async deleteById(id: string): Promise<void> {
        await prismaClient.businessInfo.delete({
            where: {
                uuid: id
            }
        })

    }
}