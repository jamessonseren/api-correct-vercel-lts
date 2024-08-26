import { IBenefitsRepository } from '../../repositories/benefit.repository';
import { BenefitsEntity } from '../../entities/benefit.entity';
import { InputCreateBenefitDto, OutputCreateBenefitDto } from './create-benefit.dto';

export class CreateBenefitUsecase {
    constructor(
      private benefitsRepository: IBenefitsRepository,
    ) {}

    async execute(input: InputCreateBenefitDto): Promise<OutputCreateBenefitDto> {

        const benefit = BenefitsEntity.create(input)

        await this.benefitsRepository.create(benefit)

        return {
            uuid: benefit.uuid.uuid,
            name: benefit.name,
            description: benefit.description,
            item_type: benefit.item_type,
            item_category: benefit.item_category,
            parent_uuid: benefit.parent_uuid ? benefit.parent_uuid.uuid : null,
            business_info_uuid: benefit.business_info_uuid ? benefit.business_info_uuid.uuid : null
        }

    }
}
