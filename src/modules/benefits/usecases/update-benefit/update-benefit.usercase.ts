import { CustomError } from '../../../../errors/custom.error';
import { IBenefitsRepository } from '../../repositories/benefit.repository';
import { BenefitsEntity } from '../../entities/benefit.entity';

export class UpdateBenefitUsecase {
    constructor(private benefitsRepository: IBenefitsRepository) {}

    async execute(uuid: string, data: BenefitsEntity) {
        const benefit = await this.benefitsRepository.update(uuid, data);

        return benefit;
    }
}
