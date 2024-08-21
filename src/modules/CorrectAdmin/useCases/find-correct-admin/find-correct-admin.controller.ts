import { Uuid } from "../../../../@shared/ValueObjects/uuid.vo";
import { ICorrectAdminRepository } from "../../repositories/correct-admin.repository"
import { Request, Response } from "express";
import { FindCorrectAdminUsecase } from "./find-correct-admin.usecase";

export class FindCorrectAdminController {
  constructor(
    private correctAdminRepository: ICorrectAdminRepository
){}

async handle(req: Request, res: Response){
    try{
        const correctAdminId = req.correctAdminId
        const validAdminUsecase = new FindCorrectAdminUsecase(
            this.correctAdminRepository
        )

        const admin = await validAdminUsecase.execute(new Uuid(correctAdminId))

        return res.json(admin)

    }catch(err:any){
        return res.status(err.statusCode).json({
            error: err.message
        })
    }
}
}
