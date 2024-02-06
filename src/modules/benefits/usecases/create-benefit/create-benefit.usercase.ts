import { IBenefitsRepository } from '../../repositories/benefit.repository';
import { BenefitsEntity } from '../../entities/benefit.entity';

export class CreateBenefitUsecase {
    constructor(private benefitsRepository: IBenefitsRepository) {}

    async execute(data: BenefitsEntity) {
        const benefit = await this.benefitsRepository.create(data);

        return benefit;
    }
}
