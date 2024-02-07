import { CustomError } from '../../../../errors/custom.error';
import { IBranchRepository } from '../../repositories/branch.repository';

export class GetBranchByIDUsecase {
    constructor(private branchRepository: IBranchRepository) {}

    async execute(uuid: string) {
        const branch = await this.branchRepository.getByID(uuid);
        if (!branch) throw new CustomError('branch not found', 404);

        return branch;
    }
}
