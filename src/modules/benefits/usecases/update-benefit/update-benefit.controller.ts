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
            const data = req.body;
            data.uuid = req.params.uuid;

           
            const resp = await updateBenefitUsecase.execute(data);

            return res.status(200).json(resp);
        } catch (err: any) {
            console.log({err})
            return res.status(err.statusCode).json({
                error: err.message,
            });
        }
    }
}
