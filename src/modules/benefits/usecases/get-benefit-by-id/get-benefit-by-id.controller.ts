import { Request, Response } from 'express';
import { IBenefitsRepository } from '../../repositories/benefit.repository';
import { GetBenefitByIDUsecase } from './get-benefit-by-id.usecase';

export class GetBenefitByIDController {
    constructor(private BenefitsRepository: IBenefitsRepository) {}

    async handle(req: Request, res: Response) {
        try {
            const getBenefitByIDUsecase = new GetBenefitByIDUsecase(
                this.BenefitsRepository
            );
            const uuid = req.params.uuid;

            if (!uuid) {
                return res.status(400).json({
                    error: 'Benefit uuid is required',
                });
            }

            const resp = await getBenefitByIDUsecase.execute(uuid);

            return res.json(resp);
        } catch (err: any) {
            return res.status(err.statusCode).json({
                error: err.message,
            });
        }
    }
}
