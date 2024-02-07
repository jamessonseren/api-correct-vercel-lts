import { IBranchRepository } from '../../repositories/branch.repository';
import { BranchEntity } from '../../entities/branch.entity';

export class UpdateBranchUsecase {
    constructor(private branchRepository: IBranchRepository) {}

    async execute(uuid: string, data: BranchEntity) {
        const branch = await this.branchRepository.update(uuid, data);

        return branch;
    }
}
