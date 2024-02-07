import { BranchPrismaRepository } from '../../repositories/implementations/branch.prisma.repository';
import { GetBranchByIDController } from './get-branch-by-id.controller';

const branchRepository = new BranchPrismaRepository();
const getBranchByIDController = new GetBranchByIDController(branchRepository);

export { getBranchByIDController };
