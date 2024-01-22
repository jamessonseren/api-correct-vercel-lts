import { prismaClient } from "../../../../infra/databases/prisma.config";
import { AdminResponse } from "../../correct-dto/correct.dto";
import { CorrectAdminEntity } from "../../entities/correct-admin.entity";
import { ICorrectAdminRepository } from "../correct-admin.repository";



export class CorrectAdminPrismaRepository implements ICorrectAdminRepository {

    async findByUserName(userName: string): Promise<CorrectAdminEntity | null> {
        const admin = await prismaClient.correctAdmin.findUnique({
            where: {
                userName: userName
            }
        })

        return admin
    }
    async save(data: CorrectAdminEntity): Promise<AdminResponse> {
        const admin = await prismaClient.correctAdmin.create({
            data: {
                name: data.name,
                email: data.email,
                userName: data.userName,
                password: data.password
            },
            select: {
                uuid: true,
                name: true,
                email: true,
                userName: true,
                isAdmin: true
            }
        })

        return admin
    }

    async findById(uuid: string): Promise<AdminResponse | null> {
        const admin = await prismaClient.correctAdmin.findUnique({
            where: {
                uuid
            }
        })
        return admin
    }

    async findAdmin(): Promise<AdminResponse | null> {
        const admin = await prismaClient.correctAdmin.findFirst({
            where: {
                isAdmin: true
            },
            select: {
                uuid: true,
                name: true,
                email: true,
                userName: true,
                isAdmin: true,

            }
        })
        return admin

    }

}