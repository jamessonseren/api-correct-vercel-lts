import { prismaClient } from '../../../../infra/databases/prisma.config';
import { BranchEntity } from '../../entities/branch.entity';
import { IBranchRepository } from '../branch.repository';
import { newDateF } from '../../../../utils/date';

export class BranchPrismaRepository implements IBranchRepository {
    async findByName(branch_name: string): Promise<BranchEntity | null> {
        const branch = await prismaClient.branchInfo.findFirst({
            where:{
                name: branch_name
            }
        })

        return branch as BranchEntity
    }
    async create(data: BranchEntity): Promise<BranchEntity> {
        const r = await prismaClient.branchInfo.create({
            data: {
                uuid: data.uuid,
                name: data.name,
                marketing_tax: data.marketing_tax,
                market_place_tax: data.market_place_tax,
                admin_tax: data.admin_tax,
                created_at: newDateF(new Date()),
                updated_at: newDateF(new Date()),
            },
        });

        return r as BranchEntity;
    }

    async getByID(uuid: string): Promise<BranchEntity | null> {
        const r = await prismaClient.branchInfo.findFirst({
            where: { uuid: uuid },
        });

        if (r !== null) {
            return r as BranchEntity;
        }

        return null;
    }

    async update(uuid: string, data: BranchEntity): Promise<void> {
        const _r = await prismaClient.branchInfo.update({
            data: {
                name: data.name,
                marketing_tax: data.marketing_tax,
                market_place_tax: data.market_place_tax,
                admin_tax: data.admin_tax,
                updated_at: newDateF(new Date()),
            },
            where: { uuid: uuid },
        });
    }

    async list(): Promise<BranchEntity[] | []> {
        const r = await prismaClient.branchInfo.findMany();

        if (r.length > 0) {
            return r as BranchEntity[];
        }

        return [];
    }

    // async delete(uuid: string): Promise<void> {
    //     const _r = await prismaClient.branchInfo.delete({
    //         where: { uuid: uuid },
    //     });
    // }
}
