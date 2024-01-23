import { Request, Response } from "express";
import { ICompanyUserRepository } from "../../repositories/company-user.repository";
import { CompanyUserEntity } from "../../entities/company-user.entity";
import { logger } from "../../../../../utils/logger";
import { UpdateUserByAdminUsecase } from "./update-user-by-admin.usecase";

export class UpdateUserbyAdminController {
    constructor(
        private companyUserRepository: ICompanyUserRepository
    ) { }

    async handle(req: Request, res: Response) {

        try {
            const data: CompanyUserEntity = req.body
            data.uuid = req.query.user_id as string

            data.business_document = req.query.business_document as string
            const updateUserUsecase = new UpdateUserByAdminUsecase(this.companyUserRepository)

            const updateUser = await updateUserUsecase.execute(data)

            return res.json(updateUser)

        } catch (err: any) {
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })
        }


    }
}