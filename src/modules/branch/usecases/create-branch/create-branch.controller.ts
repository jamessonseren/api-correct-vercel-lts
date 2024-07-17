import { Request, Response } from 'express';
import { IBranchRepository } from '../../repositories/branch.repository';
import { CreateBranchUsecase } from './create-branch.usercase';
import { BranchEntity } from '../../entities/branch.entity';

export class CreateBranchController {
    constructor(private branchRepository: IBranchRepository) {}

    async handle(req: Request, res: Response) {
        try {
            const createBranchUsecase = new CreateBranchUsecase(
                this.branchRepository
            );
            const data: BranchEntity = req.body;

            const resp = await createBranchUsecase.execute(data);

            return res.status(201).json(resp);
        } catch (err: any) {
            return res.status(err.statusCode).json({
                error: err.message,
            });
        }
    }
}
