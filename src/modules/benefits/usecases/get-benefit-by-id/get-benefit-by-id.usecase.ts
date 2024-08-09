import { Uuid } from '../../../../@shared/ValueObjects/uuid.vo';
import { CustomError } from '../../../../errors/custom.error';
import { IBenefitsRepository } from '../../repositories/benefit.repository';
import { OutputGetBenefitsDTO } from './get-benefit.dto';

export class GetBenefitByIDUsecase {
    constructor(private benefitsRepository: IBenefitsRepository) {}

    async execute(uuid: Uuid):Promise<OutputGetBenefitsDTO> {
        if(!uuid) throw new CustomError("UUID is required", 400)

        const benefit = await this.benefitsRepository.find(uuid);
        if (!benefit) throw new CustomError('benefit not found', 404);

        return {
            uuid: benefit.uuid,
            name: benefit.name,
            description: benefit.description,
            item_type: benefit.item_type,
            item_category: benefit.item_category,
            created_at: benefit.created_at,
            updated_at: benefit.updated_at
        };
    }
}
