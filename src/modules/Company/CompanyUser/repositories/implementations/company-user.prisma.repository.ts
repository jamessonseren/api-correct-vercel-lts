import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { CompanyUserEntity, CompanyUserProps } from "../../entities/company-user.entity";
import { ICompanyUserRepository } from "../company-user.repository";
import { BusinessUserResponse } from "../../companyUserDto/company-user.dto";


export class CompanyUserPrismaRepository implements ICompanyUserRepository {
    async findByUserNameAndDocumentAuth(user_name: string, business_document: string): Promise<CompanyUserEntity | null> {
        const companyUser = await prismaClient.businessUser.findFirst({
            where:{
                user_name,
                business_document
            }
        })

        return companyUser
    }
    

    async findById(uuid: string): Promise<BusinessUserResponse | null> {
        const companyUser = await prismaClient.businessUser.findUnique({
            where: {
                uuid
            }
        })

        return companyUser || null
    }

    async findByCnpjAndAdminRole(business_document: string): Promise<BusinessUserResponse | null> {
        const admin = await prismaClient.businessUser.findFirst({
            where: {
                business_document,
                is_admin: true
            }
        })

        return admin
    }

    async findByEmail(email: string): Promise<BusinessUserResponse | null> {
        const companyUser = await prismaClient.businessUser.findUnique({
            where: {
                email
            }
        })

        return companyUser || null
    }

    async findByUsers(business_document: string): Promise<CompanyUserEntity[] | null> {
        const companyUser = await prismaClient.businessUser.findMany({
            where: {
                business_document,
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
                password: data.password

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
                admin_document: data.admin_document,
                email: data.email,
                is_client: data.is_client,
                is_admin: data.is_admin,
                permissions: data.permissions,
                function: data.function,
                password: data.password,
                user_name: data.user_name
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