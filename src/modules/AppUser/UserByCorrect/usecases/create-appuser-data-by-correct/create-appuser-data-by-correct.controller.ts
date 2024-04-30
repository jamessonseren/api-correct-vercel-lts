import { Request, Response } from "express";

import { CustomError } from "../../../../../errors/custom.error";
import { CreateAppUserByCorrectUsecase } from "./create-appuser-data-by-correct.usecase";
import { logger } from "../../../../../utils/logger";
import { IAppUserInfoRepository } from "../../../AppUserManagement/repositories/app-user-info.repository";
import { ICompanyDataRepository } from "../../../../Company/CompanyData/repositories/company-data.repository";

export class CreateAppUserByCorrectController {
    constructor(
        private appUserInfoRepository: IAppUserInfoRepository,
        private businessRepository: ICompanyDataRepository


    ){}
    async handle(req: Request, res: Response) {

        try {

            const business_info_uuid = req.query.business_info_id as string
            if(!req.file) throw new CustomError("Error upload file", 400)
            
            const { originalname, filename: csvFilePath} = req.file

            const appUserUsecase = new CreateAppUserByCorrectUsecase(
                this.appUserInfoRepository,
                this.businessRepository
            )

            const user = await appUserUsecase.execute(csvFilePath, business_info_uuid)

            return res.json(user)
        } catch (err: any) {
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })
        }

    }
}