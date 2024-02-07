import { BranchPrismaRepository } from '../../repositories/implementations/branch.prisma.repository';
import { UpdateBranchController } from './update-branch.controller';

const branchRepository = new BranchPrismaRepository();
const updateBranchController = new UpdateBranchController(branchRepository);

export { updateBranchController };
