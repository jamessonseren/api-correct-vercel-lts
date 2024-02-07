import { BranchPrismaRepository } from '../../repositories/implementations/branch.prisma.repository';
import { GetListBranchController } from './get-list-branch.controller';

const branchRepository = new BranchPrismaRepository();
const getListsBranchController = new GetListBranchController(branchRepository);

export { getListsBranchController };
