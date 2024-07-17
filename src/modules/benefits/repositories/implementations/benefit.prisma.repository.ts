import { prismaClient } from '../../../../infra/databases/prisma.config';
import { BenefitsEntity, BenefitsProps } from '../../entities/benefit.entity';
import { IBenefitsRepository } from '../benefit.repository';
import { newDateF } from '../../../../utils/date';
import { OutputGetBenefitsDTO } from '../../usecases/get-benefit-by-id/get-benefit.dto';
import { ItemCategory, ItemType } from '../../usecases/create-benefit/create-benefit.dto';

export class BenefitPrismaRepository implements IBenefitsRepository {
    

    async create(data: BenefitsEntity): Promise<void> {
        await prismaClient.item.create({
            data: {
                uuid: data.uuid,
                name: data.name,
                description: data.description,
                item_type: data.item_type,
                item_category: data.item_category,
                created_at: newDateF(new Date()),
            },
        });

    }

    async find(id: string): Promise<BenefitsEntity> {
        const item = await prismaClient.item.findUnique({
            where: {
                uuid: id,
            },
            select: {
                uuid: true,
                name: true,
                description: true,
                item_type: true,
                item_category: true,
                parent_uuid: true,
                created_at: true,
                updated_at: true,
            },
        });

        return item as BenefitsEntity

        
    }
    


    async update(data: BenefitsEntity): Promise<void> {
         await prismaClient.item.update({
            data: {
                name: data.name,
                description: data.description,
                item_type: data.item_type,
                item_category: data.item_category,
                parent_uuid: data.parent_uuid,
                updated_at: newDateF(new Date()),
            },
            where: { uuid: data.uuid },
        });
    }


    async findAll(): Promise<(BenefitsEntity)[]> {
        const r = await prismaClient.item.findMany();

        return r as BenefitsEntity[] | []
    }

}
