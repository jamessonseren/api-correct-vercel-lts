import { prismaClient } from '../../../../infra/databases/prisma.config';
import { BenefitsEntity } from '../../entities/benefit.entity';
import { IBenefitsRepository } from '../benefit.repository';
import { newDateF } from '../../../../utils/date';

export class BenefitPrismaRepository implements IBenefitsRepository {
    async create(data: BenefitsEntity): Promise<void> {
        const r = await prismaClient.benefit.create({
            data: {
                uuid: data.uuid,
                name: data.name,
                item_type: data.item_type,
                item_category: data.item_category
                created_at: newDateF(new Date()),
                updated_at: newDateF(new Date()),
            },
        });

    }

    async getByID(uuid: string): Promise<BenefitsEntity | null> {
        const r = await prismaClient.benefit.findFirst({
            where: { uuid: uuid },
        });

        if (r !== null) {
            return r as BenefitsEntity;
        }

        return null;
    }

    async update(uuid: string, data: BenefitsEntity): Promise<void> {
        const _r = await prismaClient.benefit.update({
            data: {
                benefit_name: data.benefit_name,
                benefit_type: data.benefit_type,
                updated_at: newDateF(new Date()),
            },
            where: { uuid: uuid },
        });
    }

    async list(): Promise<BenefitsEntity[] | []> {
        const r = await prismaClient.benefit.findMany();

        if (r.length > 0) {
            return r as BenefitsEntity[];
        }

        return [];
    }

    // async delete(uuid: string): Promise<void> {
    //     const _r = await prismaClient.benefit.delete({
    //         where: { uuid: uuid },
    //     });
    // }
}
