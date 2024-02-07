import { Request, Response } from 'express';
import { IBranchRepository } from '../../repositories/branch.repository';
import { UpdateBranchUsecase } from './update-branch.usercase';
import { BranchEntity } from '../../entities/branch.entity';

export class UpdateBranchController {
    constructor(private branchRepository: IBranchRepository) {}

    async handle(req: Request, res: Response) {
        try {
            const updateBranchUsecase = new UpdateBranchUsecase(
                this.branchRepository
            );
            const data: BranchEntity = req.body;
            const uuid = req.params.uuid;

            if (!uuid) {
                return res.status(400).json({
                    error: 'Branch uuid is required',
                });
            }

            const resp = await updateBranchUsecase.execute(uuid, data);

            return res.status(200).json(resp);
        } catch (err: any) {
            return res.status(err.statusCode).json({
                error: err.message,
            });
        }
    }
}
