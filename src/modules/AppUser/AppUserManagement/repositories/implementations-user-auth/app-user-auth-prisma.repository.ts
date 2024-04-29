import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { IAppUserAuthRepository } from "../app-use-auth-repository";
import { AppUserAuthRequest, AppUserAuthResponse, AppUserAuthResponseAuthentication, UpdateAppUserRequest } from "../../../app-user-dto/app-user.dto";
import { AppUserAuthSignUpEntity } from "../../entities/app-user-auth.entity";
import { newDateF } from "../../../../../utils/date";

export class AppUserAuthPrismaRepository implements IAppUserAuthRepository {
    async save(data: AppUserAuthSignUpEntity): Promise<void> {
        await prismaClient.userAuth.create({
            data: {
                uuid: data.uuid,
                user_info_uuid: data.user_info_uuid,
                document: data.document,
                email: data.email,
                password: data.password,
                created_at: data.created_at
            }
        })
    }
    
    async update(data: AppUserAuthRequest): Promise<void> {
        await prismaClient.userAuth.update({
            where: {
                document: data.document
            },
            data: {
                user_info_uuid: data.user_info_uuid,
                document: data.document,
                email: data.email,
                updated_at: newDateF(new Date())
            }
        })
    }

    // async saveOrUpdate(data: AppUserAuthSignUpEntity): Promise<void> {
    //     await prismaClient.userAuth.upsert({
    //         where:{
    //             document: data.document
    //         },
    //         create:{
    //             uuid: data.uuid,
    //             user_info_uuid: data.user_info_uuid,
    //             document: data.document,
    //             email: data.email,
    //             password: data.password,
    //             created_at: data.created_at
    //         },
    //         update:{
    //             user_info_uuid: data.user_info_uuid,
    //             document: data.document,
    //             email: data.email,
    //             password: data.password,
    //             updated_at: newDateF(new Date())
    //         }
    //     })
    // }

    async findByEmail(email: string): Promise<AppUserAuthResponse | null> {
        return await prismaClient.userAuth.findUnique({
            where: {
                email
            }
        }) as AppUserAuthResponse | null
    }



    async findByDocumentAuth(document: string): Promise<AppUserAuthResponseAuthentication | null> {
        const appUser = await prismaClient.userAuth.findUnique({
            where: {
                document
            }
        })

        return appUser as AppUserAuthResponseAuthentication | null
    }

    async findByDocument(document: string): Promise<AppUserAuthResponse | null> {
        const appUser = await prismaClient.userAuth.findUnique({
            where: {
                document: document
            },
            select: {
                uuid: true,
                user_info_uuid: true,
                document: true,
                email: true,
                created_at: true,
                updated_at: true,
                UserInfo: {
                    include: {
                        Address: true,
                        UserValidation: true
                    }
                }

            }
        })

        return appUser as AppUserAuthResponse | null
    }


    async findById(uuid: string): Promise<AppUserAuthResponse | null> {
        const appUser = await prismaClient.userAuth.findUnique({
            where: {
                uuid
            },
            select: {
                uuid: true,
                user_info_uuid: true,
                document: true,
                email: true,
                created_at: true,
                updated_at: true,
                UserInfo: {
                    include: {
                        Address: true,
                        UserValidation: true
                    }
                }

            }
        });

        return appUser as AppUserAuthResponse | null
    }


}