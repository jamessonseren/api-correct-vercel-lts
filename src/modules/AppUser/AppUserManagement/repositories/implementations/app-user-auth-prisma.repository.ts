import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { AppUserByUserEntity } from "../../entities/create-user-by-user/appuser-by-user.entity";
import { AppUserResponse, IAppUserAuthRepository } from "../app-use-auth-repository";
import { AppUserAuthResponse } from "../app-use-auth-repository";

export class AppUserAuthPrismaRepository implements IAppUserAuthRepository {


    async findByCPFAuth(document: string): Promise<AppUserByUserEntity | null> {
        const appUser = await prismaClient.userAuth.findUnique({
            where: {
                document
            }
        })

        return appUser
    }

    async findByCPF(document: string): Promise<AppUserAuthResponse | null> {
        const appUser = await prismaClient.userAuth.findUnique({
            where: {
                document
            },
            select: {
                uuid: true,
                document: true,
                email: true

            }
        })

        if (appUser === null) return null

        return appUser
    }

    async findByemail(email: string): Promise<AppUserAuthResponse | null> {
        const appUser = await prismaClient.userAuth.findUnique({
            where: {
                email
            },
            select: {
                uuid: true,
                document: true,
                email: true

            }
        })

        if (appUser === null) return null

        return appUser
    }

    async findById(uuid: string): Promise<AppUserResponse | null> {
        const appUser = await prismaClient.userAuth.findUnique({
            where: {
                uuid
            },
            select: {
                uuid: true,
                document: true,
                email: true

            }
        })

        if (appUser === null) return null

        return appUser as AppUserResponse
    }
    async saveNewUser(data: AppUserByUserEntity): Promise<AppUserAuthResponse> {
        const appUser = await prismaClient.userAuth.create({
            data: {
                document: data.document,
                email: data.email,
                password: data.password,

            },
            select: {
                uuid: true,
                document: true,
                email: true

            }
        })
        return appUser
    }

    async saveRegisteredUser(data: AppUserByUserEntity): Promise<AppUserAuthResponse> {
        const appUser = await prismaClient.userAuth.create({
            data: {
                document: data.document,
                email: data.email,
                password: data.password,
            },
            select: {
                uuid: true,
                document: true,
                email: true

            }
        })

        return appUser
    }

}