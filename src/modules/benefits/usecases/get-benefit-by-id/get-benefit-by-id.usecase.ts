import { CustomError } from '../../../../errors/custom.error';
import { IBenefitsRepository } from '../../repositories/benefit.repository';

export class GetBenefitByIDUsecase {
    constructor(private benefitsRepository: IBenefitsRepository) {}

    async execute(uuid: string) {
        const benefit = await this.benefitsRepository.getByID(uuid);
        if (!benefit) throw new CustomError('benfit not found', 404);

        return benefit;
    }
}
