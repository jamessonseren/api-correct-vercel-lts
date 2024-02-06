import { BenefitPrismaRepository } from '../../repositories/implementations/benefit.prisma.repository';
import { UpdateBenefitController } from './update-benefit.controller';

const benefitRepository = new BenefitPrismaRepository();
const updateBenefitController = new UpdateBenefitController(benefitRepository);

export { updateBenefitController };
