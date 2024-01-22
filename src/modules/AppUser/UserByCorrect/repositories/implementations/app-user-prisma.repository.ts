import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { AppUserDataEntity } from "../../entities/appuser-data.entity";
import { AppUserProps } from "../../entities/appuser-data.entity";
import { IAppUserRepository } from "../app-user-data-repostory";

export class AppUserPrismaRepository implements IAppUserRepository{
    
    
    async findById(uuid: string): Promise<AppUserDataEntity | null> {
        const appUser = await prismaClient.userInfo.findUnique({
            where:{
                uuid
            }
        })

        return appUser
    }

    async findByCPF(document: string): Promise<AppUserDataEntity | null> {
        const appUser = await prismaClient.userInfo.findUnique({
            where:{
                document
            }
        })

        return appUser || null
    }



    // async save(data: AppUserDataEntity): Promise<AppUserProps> {
    //     return await prismaClient.userInfo.create({
    //         data:{
    //             uuid: data.uuid,
    //             business_info_uuid: data.business_info_uuid,
    //             document: data.document,
    //             document2: data.document2,
    //             document3: data.document3,
    //             first_name: data.first_name,
    //             last_name: data.last_name,
    //             display_name: data.display_name,
    //             internal_company_code: data.internal_company_code,
    //             gender: data.gender,
    //             date_of_birth: data.date_of_birth,
    //             phone: data.phone,
    //             salary: data.salary,
    //             company_owner: data.company_owner,
    //             status: data.status,
    //             function: data.function,
    //             authenticated: data.authenticated,
    //             marital_status: data.marital_status,
    //             dependents_quantity: data.dependents_quantity
    //         }
    //     })

    // }

    async saveOrUpdate(data: AppUserDataEntity): Promise<AppUserProps> {
        return await prismaClient.userInfo.upsert({
            where:{
                document: data.document
            },
            create:{
                uuid: data.uuid,
                business_info_uuid: data.business_info_uuid,
                document: data.document,
                document2: data.document2,
                document3: data.document3,
                first_name: data.first_name,
                last_name: data.last_name,
                display_name: data.display_name,
                internal_company_code: data.internal_company_code,
                gender: data.gender,
                date_of_birth: data.date_of_birth,
                phone: data.phone,
                salary: data.salary,
                company_owner: data.company_owner,
                status: data.status,
                function: data.function,
                authenticated: data.authenticated,
                marital_status: data.marital_status,
                dependents_quantity: data.dependents_quantity
            },
            update:{
                business_info_uuid: data.business_info_uuid,
                document: data.document,
                document2: data.document2,
                document3: data.document3,
                first_name: data.first_name,
                last_name: data.last_name,
                display_name: data.display_name,
                internal_company_code: data.internal_company_code,
                gender: data.gender,
                date_of_birth: data.date_of_birth,
                phone: data.phone,
                salary: data.salary,
                company_owner: data.company_owner,
                status: data.status,
                function: data.function,
                authenticated: data.authenticated,
                marital_status: data.marital_status,
                dependents_quantity: data.dependents_quantity
            }
        })
    }

    

}