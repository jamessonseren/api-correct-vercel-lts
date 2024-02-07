import { IBranchRepository } from '../../repositories/branch.repository';
import { BranchEntity } from '../../entities/branch.entity';

export class CreateBranchUsecase {
    constructor(private branchRepository: IBranchRepository) {}

    async execute(data: BranchEntity) {
        const branch = await this.branchRepository.create(data);

        return branch;
    }
}
