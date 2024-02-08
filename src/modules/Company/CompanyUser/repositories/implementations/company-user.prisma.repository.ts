import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { CompanyUserEntity, CompanyUserProps } from "../../entities/company-user.entity";
import { ICompanyUserRepository } from "../company-user.repository";
import { BusinessUserResponse } from "../../companyUserDto/company-user.dto";


export class CompanyUserPrismaRepository implements ICompanyUserRepository {
    async findByBusinessIdAndUsername(id: string, user_name: string | null): Promise<CompanyUserEntity | null> {
        const companyUser = await prismaClient.businessUser.findFirst({
            where:{
                business_info_uuid: id,
                user_name
            }
        })

        return companyUser
    }
    async findByBusinessIdAndEmail(id: string, email: string): Promise<CompanyUserEntity | null> {
        const companyUser = await prismaClient.businessUser.findUnique({
            where:{
                business_info_uuid: id,
                email
            }
        })

        return companyUser
    }
   
       

    async findById(id: string): Promise<BusinessUserResponse | null> {
        const companyUser = await prismaClient.businessUser.findUnique({
            where: {
                uuid: id
            },
            select:{
                uuid: true,
                business_info_uuid: true,
                is_admin: true,
                document: true,
                name: true,
                email: true,
                user_name: true,
                function: true,
                permissions: true,
                status: true
            },
        
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

    async findUsers(business_info_uuid: string): Promise<BusinessUserResponse[] | null> {
        const companyUser = await prismaClient.businessUser.findMany({
            where: {
                business_info_uuid,
                is_admin: false
            }
        })

        return companyUser
    }   

    async updateUser(data: CompanyUserEntity): Promise<CompanyUserEntity> {
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

    async saveUser(data: CompanyUserEntity): Promise<CompanyUserEntity> {
        const companyUser = await prismaClient.businessUser.create({
            data: {
                uuid: data.uuid,
                business_info_uuid: data.business_info_uuid,
                is_admin: data.is_admin,
                document: data.document,
                name: data.name,
                email: data.email,
                user_name: data.user_name,
                password: data.password,
                function: data.function,
                permissions: data.permissions,
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