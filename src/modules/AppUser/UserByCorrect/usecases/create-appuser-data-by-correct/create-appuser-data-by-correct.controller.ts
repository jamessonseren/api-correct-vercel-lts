import { Request, Response } from "express";
import { IAppUserRepository } from "../../repositories/app-user-data-repostory";

import { CustomError } from "../../../../../errors/custom.error";
import { CreateAppUserByCorrectUsecase } from "./create-appuser-data-by-correct.usecase";

export class CreateAppUserByCorrectController {
    constructor(
        private appUserRepository: IAppUserRepository

    ){}
    async handle(req: Request, res: Response) {

        try {

            const business_info_uuid = req.body.business_info_id
            if(!req.file) throw new CustomError("Error upload file", 401)
            
            const { originalname, filename: csvFilePath} = req.file

            const appUserUsecase = new CreateAppUserByCorrectUsecase(
                this.appUserRepository
            )

            const user = await appUserUsecase.execute(csvFilePath, business_info_uuid)

            return res.json(user)
        } catch (err: any) {
            return res.status(err.statusCode).json({
                error: err.message
            })
        }

    }
}