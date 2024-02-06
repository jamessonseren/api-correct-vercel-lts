import { BenefitPrismaRepository } from '../../repositories/implementations/benefit.prisma.repository';
import { GetListBenefitController } from './get-list-benefit.controller';

const benefitRepository = new BenefitPrismaRepository();
const getListsBenefitController = new GetListBenefitController(
    benefitRepository
);

export { getListsBenefitController };
