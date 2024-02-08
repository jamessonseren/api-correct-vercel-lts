import { Request, Response } from "express";
import { ICompanyUserRepository } from "../../repositories/company-user.repository";
import { CreateCompanyAdminUseCase } from "./create-company-admin.usecase";
import { CompanyUserProps } from "../../entities/company-user.entity";
import { logger } from "../../../../../utils/logger";
import { ICompanyDataRepository } from "../../../CompanyData/repositories/company-data.repository";

export class CreateCompanyUserByCorrectController {
    constructor(
        private companyUserRepository: ICompanyUserRepository,
        private companyDataRepository: ICompanyDataRepository

    ){}

    async handle(req: Request, res: Response){
        try{
            const data: CompanyUserProps = req.body

            const companyUserUsecase = new CreateCompanyAdminUseCase(
                this.companyUserRepository,
                this.companyDataRepository
            )

            await companyUserUsecase.execute(data)

            return res.status(201).json({message: "Business admin created successfully"})
            
        }catch(err: any){
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}