import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { CompanyAddressEntity } from "../../entities/company-address.entity";
import { ICompanyAddressRepository } from "../company-address.repository";

export class CompanyAddressPrismaRepository implements ICompanyAddressRepository{
    async update(data: CompanyAddressEntity): Promise<CompanyAddressEntity> {
        const companyAddress = await prismaClient.address.update({
            where:{
                uuid: data.uuid
            },
            data:{
                line1:data.line1,
                line2: data.line2,
                line3: data.line3,
                postal_code: data.postal_code,
                neighborhood: data.neighborhood,
                city: data.city,
                state: data.state,
                country: data.country
            }
        })

        return companyAddress
    }
    async save(data: CompanyAddressEntity): Promise<CompanyAddressEntity> {
        const companyAddress = await prismaClient.address.create({
            data:{
                uuid: data.uuid,
                line1:data.line1,
                line2: data.line2,
                line3: data.line3,
                postal_code: data.postal_code,
                neighborhood: data.neighborhood,
                city: data.city,
                state: data.state,
                country: data.country
            }
        })

        return companyAddress
    }
    async findById(uuid: string): Promise<CompanyAddressEntity | null> {
        const companyAddress = await prismaClient.address.findUnique({
            where:{
                uuid
            }
        })

        return companyAddress
    }
    

}