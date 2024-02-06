import { Request, Response } from 'express';
import { IBenefitsRepository } from '../../repositories/benefit.repository';
import { UpdateBenefitUsecase } from './update-benefit.usercase';
import { BenefitsEntity } from '../../entities/benefit.entity';

export class UpdateBenefitController {
    constructor(private BenefitsRepository: IBenefitsRepository) {}

    async handle(req: Request, res: Response) {
        try {
            const updateBenefitUsecase = new UpdateBenefitUsecase(
                this.BenefitsRepository
            );
            const data: BenefitsEntity = req.body;
            const uuid = req.params.uuid;

            if (!uuid) {
                return res.status(400).json({
                    error: 'Benefit uuid is required',
                });
            }

            const resp = await updateBenefitUsecase.execute(uuid, data);

            return res.status(200).json(resp);
        } catch (err: any) {
            return res.status(err.statusCode).json({
                error: err.message,
            });
        }
    }
}
