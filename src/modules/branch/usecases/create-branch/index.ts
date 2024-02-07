import { BranchPrismaRepository } from '../../repositories/implementations/branch.prisma.repository';
import { CreateBranchController } from './create-branch.controller';

const branchRepository = new BranchPrismaRepository();
const createBranchController = new CreateBranchController(branchRepository);

export { createBranchController };
