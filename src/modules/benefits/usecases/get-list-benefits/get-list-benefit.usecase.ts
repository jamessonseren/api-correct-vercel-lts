import { IBenefitsRepository } from '../../repositories/benefit.repository';

export class GetListBenefitUsecase {
    constructor(private benefitsRepository: IBenefitsRepository) {}

    async execute() {
        const benefit = await this.benefitsRepository.list();

        return benefit;
    }
}
