import { Uuid } from "../../../../../@shared/ValueObjects/uuid.vo";
import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { AddressEntity } from "../../../../../infra/shared/address/address.entity";
import { newDateF } from "../../../../../utils/date";
import { IAppUserAddressRepository } from "../app-user-address.repository";

export class AppUserAddressPrismaRepository implements IAppUserAddressRepository {
    async createAddress(data: AddressEntity, document: string): Promise<void> {
        await prismaClient.$transaction([
            prismaClient.address.create({
                data: {
                    uuid: data.uuid.uuid,
                    line1: data.line1,
                    line2: data.line2,
                    postal_code: data.postal_code,
                    neighborhood: data.neighborhood,
                    city: data.city,
                    state: data.state,
                    country: data.country
                }
            })
        ]),

            await prismaClient.userInfo.update({
                where: {
                    document
                },
                data: {
                    address_uuid: data.uuid.uuid,
                    updated_at: newDateF(new Date())
                }
            })
    }
    async create(data: AddressEntity): Promise<void> {
        throw new Error("Method not implemented.");

    }
    update(entity: AddressEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async find(id: Uuid): Promise<AddressEntity | null> {
        const address = await prismaClient.address.findUnique({
            where: {
                uuid: id.uuid
            }
        })

        if(!address) return null

        return {
            uuid: new Uuid(address.uuid),
            line1: address.line1,
            line2: address.line2,
            line3: address.line3,
            postal_code: address.postal_code,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            country: address.country,
            created_at: address.created_at,
            updated_at: address.updated_at

        } as AddressEntity
    }
    findAll(): Promise<AddressEntity[]> {
        throw new Error("Method not implemented.");
    }
    // async findById(id: string): Promise<AddressEntity | null> {
    //     return await prismaClient.address.findUnique({
    //         where: {
    //             uuid: id
    //         }
    //     })
    // }

    // async save(data: AddressEntity, document: string): Promise<void> {
    //     await prismaClient.$transaction([
    //         prismaClient.address.create({
    //             data: {
    //                 uuid: data.uuid,
    //                 line1: data.line1,
    //                 line2: data.line2,
    //                 postal_code: data.postal_code,
    //                 neighborhood: data.neighborhood,
    //                 city: data.city,
    //                 state: data.state,
    //                 country: data.country
    //             }
    //         })
    //     ]),

    //         await prismaClient.userInfo.update({
    //             where: {
    //                 document
    //             },
    //             data: {
    //                 address_uuid: data.uuid,
    //                 updated_at: newDateF(new Date())
    //             }
    //         })
    // }

}