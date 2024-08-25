import { IBranchRepository } from '../../repositories/branch.repository';
import { BranchEntity } from '../../entities/branch.entity';
import { CustomError } from '../../../../errors/custom.error';

export class CreateBranchUsecase {
  constructor(private branchRepository: IBranchRepository) { }

  async execute(data: BranchEntity) {

    //check if branch name already exist

    const branchName = await this.branchRepository.findByName(data.name)
    if (branchName) throw new CustomError("Branch name already registered", 409)

    const branch = await this.branchRepository.create(data);
    return branch;
  }
}
