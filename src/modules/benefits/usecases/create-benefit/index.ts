import { BenefitPrismaRepository } from '../../repositories/implementations/benefit.prisma.repository';
import { CreateBenefitController } from './create-benefit.controller';

const benefitRepository = new BenefitPrismaRepository();
const createBenefitController = new CreateBenefitController(benefitRepository);

export { createBenefitController };
