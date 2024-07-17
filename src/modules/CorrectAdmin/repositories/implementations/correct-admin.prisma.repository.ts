import { prismaClient } from "../../../../infra/databases/prisma.config";
import { OutputFindAdminAuthDTO, OutputFindAdminDTO } from "../../correct-dto/correct.dto";
import { CorrectAdminEntity } from "../../entities/correct-admin.entity";
import { ICorrectAdminRepository } from "../correct-admin.repository";



export class CorrectAdminPrismaRepository implements ICorrectAdminRepository {
    async create(data: CorrectAdminEntity): Promise<void> {
        await prismaClient.correctAdmin.create({
            data: {
                name: data.name,
                email: data.email,
                userName: data.userName,
                password: data.password
            }
        })
    }

    async update(data: CorrectAdminEntity): Promise<void> {
        await prismaClient.correctAdmin.update({
            where: {
                uuid: data.uuid
            },
            data: {
                name: data.name,
                email: data.email,
                userName: data.userName,
            }
        })
    }
    async find(id: string): Promise<OutputFindAdminDTO | null> {
        
        const admin = await prismaClient.correctAdmin.findUnique({
            where: {
                uuid: id
            }
        })

        return admin
    }
    findAll(): Promise<CorrectAdminEntity[]> {
        throw new Error("Method not implemented.");
    }

    async findByUserName(userName: string): Promise<OutputFindAdminDTO | null> {
        const admin = await prismaClient.correctAdmin.findUnique({
            where: {
                userName: userName
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

    async findByUserNameAuth(userName: string): Promise<CorrectAdminEntity | null> {
        const admin = await prismaClient.correctAdmin.findUnique({
            where: {
                userName: userName
            },
            select: {
                uuid: true,
                name: true,
                email: true,
                userName: true,
                isAdmin: true,
                password: true
            }
        })

        return admin as CorrectAdminEntity
    }

}