import { Request, Response } from "express";
import { ICompanyUserRepository } from "../../repositories/company-user.repository";
import { CreateCompanyUserByAdminUsecase } from "./create-company-user-by-admin.usecase";
import { CompanyUserProps } from "../../entities/company-user.entity";
import { logger } from "../../../../../utils/logger";
import { ICompanyDataRepository } from "../../../CompanyData/repositories/company-data.repository";

export class CreateCompanyUserByAdminController {
    constructor(
        private companyUserRepository: ICompanyUserRepository,

    ){}

    async handle(req: Request, res: Response){
        try{
            const data: CompanyUserProps = req.body

            const companyAdminId = req.companyUserId as string
            const companyUserUsecase = new CreateCompanyUserByAdminUsecase(
                this.companyUserRepository
            )

            const companyUser = await companyUserUsecase.execute(data, companyAdminId)

            return res.json(companyUser)
            
        }catch(err: any){
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}