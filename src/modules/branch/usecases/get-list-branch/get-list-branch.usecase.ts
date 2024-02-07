import { IBranchRepository } from '../../repositories/branch.repository';

export class GetListBranchUsecase {
    constructor(private branchRepository: IBranchRepository) {}

    async execute() {
        const branch = await this.branchRepository.list();

        return branch;
    }
}
