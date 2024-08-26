import { prismaClient } from "../../../../../../infra/databases/prisma.config";
import { newDateF } from "../../../../../../utils/date";
import { CompanyDataEntity } from "../../../../CompanyData/entities/company-data.entity";
import { ICompanyDataRepository } from "../../../../CompanyData/repositories/company-data.repository";


export class CompanyDataPrismaRepository implements ICompanyDataRepository {
    async update(data: CompanyDataEntity): Promise<CompanyDataEntity> {
        const companyData = await prismaClient.businessInfo.update({
            where:{
                uuid: data.uuid
            },
            data:{
                fantasy_name: data.fantasy_name,
                corporate_reason: data.corporate_reason,
                document: data.document,
                classification: data.classification,
                colaborators_number: data.colaborators_number,
                phone_1: data.phone_1,
                phone_2: data.phone_2,
                business_type: data.business_type,
                email: data.email,
                status: data.status,
                updated_at: newDateF(new Date())
            }
        })

        return companyData as CompanyDataEntity
    }
    async findByEmail(email: string): Promise<CompanyDataEntity | null> {
        const companyData = await prismaClient.businessInfo.findUnique({
            where:{
                email
            }
        })

        if(!companyData) return null
        return companyData as CompanyDataEntity
    }



    async findByDocument(document: string): Promise<CompanyDataEntity | null> {
        const companyData = await prismaClient.businessInfo.findUnique({
            where: {
                document
            }
        })

        if(!companyData) return null

        return companyData as CompanyDataEntity
    }

    async findById(id: string): Promise<CompanyDataEntity | null> {
        const companyData = await prismaClient.businessInfo.findUnique({
            where: {
                uuid: id
            },
            include:{
                Address: true
            }
        })
        if(!companyData) return null

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
