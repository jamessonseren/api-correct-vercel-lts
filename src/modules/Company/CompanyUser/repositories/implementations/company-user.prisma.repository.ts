import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { CompanyUserEntity, CompanyUserProps } from "../../entities/company-user.entity";
import { ICompanyUserRepository } from "../company-user.repository";
import { BusinessUserResponse } from "../../companyUserDto/company-user.dto";


export class CompanyUserPrismaRepository implements ICompanyUserRepository {
    async findByUserNameAndDocumentAuth(user_name: string, document: string): Promise<CompanyUserEntity | null> {
        const companyUser = await prismaClient.businessUser.findFirst({
            where:{
                user_name,
                business_document: document
            }
        })

        return companyUser
    }
       

    async findById(id: string): Promise<BusinessUserResponse | null> {
        const companyUser = await prismaClient.businessUser.findUnique({
            where: {
                uuid: id
            }
        })
        return companyUser
    }

   
    async findByEmail(email: string): Promise<CompanyUserEntity | null> {
        const companyUser = await prismaClient.businessUser.findUnique({
            where: {
                email
            }
        })

        return companyUser
    }

    async findByUsers(document: string): Promise<CompanyUserEntity[] | null> {
        const companyUser = await prismaClient.businessUser.findMany({
            where: {
                document,
                is_admin: false
            }
        })

        return companyUser
    }   

    async updateUser(data: CompanyUserEntity): Promise<BusinessUserResponse> {
        const updateUser = await prismaClient.businessUser.update({
            where: {
                uuid: data.uuid
            },
            data: {
                permissions: data.permissions,
                password: data.password,
                status: data.status

            }
        })

        return updateUser
    }

    async saveUser(data: CompanyUserEntity): Promise<BusinessUserResponse> {
        const companyUser = await prismaClient.businessUser.create({
            data: {
                uuid: data.uuid,
                business_info_uuid: data.business_info_uuid,
                name: data.name,
                business_document: data.business_document,
                document: data.document,
                email: data.email,
                is_admin: data.is_admin,
                permissions: data.permissions,
                function: data.function,
                password: data.password,
                user_name: data.user_name,
                status: data.status
            }            
        })

        return companyUser
    }



    async deleteByAdminById(user_uuid: string): Promise<void> {
        await prismaClient.businessUser.delete({
            where:{
                uuid: user_uuid
            }
        })
    }


}