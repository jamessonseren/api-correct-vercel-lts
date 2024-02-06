import { BenefitPrismaRepository } from '../../repositories/implementations/benefit.prisma.repository';
import { GetBenefitByIDController } from './get-benefit-by-id.controller';

const benefitRepository = new BenefitPrismaRepository();
const getBenefitByIDController = new GetBenefitByIDController(
    benefitRepository
);

export { getBenefitByIDController };
