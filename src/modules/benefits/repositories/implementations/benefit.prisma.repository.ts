import { prismaClient } from '../../../../infra/databases/prisma.config';
import { BenefitsEntity, BenefitsProps } from '../../entities/benefit.entity';
import { IBenefitsRepository } from '../benefit.repository';
import { newDateF } from '../../../../utils/date';
import { OutputGetBenefitsDTO } from '../../usecases/get-benefit-by-id/get-benefit.dto';
import { ItemCategory, ItemType } from '../../usecases/create-benefit/create-benefit.dto';
import { Uuid } from '../../../../@shared/ValueObjects/uuid.vo';

export class BenefitPrismaRepository implements IBenefitsRepository {


    async create(data: BenefitsEntity): Promise<void> {
        await prismaClient.item.create({
            data: {
                uuid: data.uuid.uuid,
                name: data.name,
                description: data.description,
                item_type: data.item_type,
                item_category: data.item_category,
                parent_uuid: data.parent_uuid ? data.parent_uuid.uuid : null,
                created_at: newDateF(new Date()),
            },
        });

    }

    async find(id: Uuid): Promise<BenefitsEntity> {
        
        const item = await prismaClient.item.findUnique({
            where: {
                uuid: id.uuid,
            }
        });

        return {
            uuid: new Uuid(item.uuid),
            name: item.name,
            description: item.description,
            item_type: item.item_type as ItemType,
            item_category: item.item_category as ItemCategory,
            parent_uuid: new Uuid(item.parent_uuid),
            created_at: item.created_at,
            updated_at: item.updated_at

        } as BenefitsEntity


    }



    async update(data: BenefitsEntity): Promise<void> {
        const result = await prismaClient.item.update({
            where: { 
                uuid: data.uuid.uuid as string
            },
            data: {
                name: data.name,
                description: data.description,
                item_type: data.item_type,
                item_category: data.item_category,
                parent_uuid: data.parent_uuid ? data.parent_uuid.uuid : null,
                updated_at: newDateF(new Date()),
            }
        });
    }


    async findAll(): Promise<(BenefitsEntity)[]> {
        const r = await prismaClient.item.findMany();

        return r as BenefitsEntity[] | []
    }

}
