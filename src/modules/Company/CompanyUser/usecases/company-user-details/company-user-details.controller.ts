import { Request, Response } from "express";
import { ICompanyUserRepository } from "../../repositories/company-user.repository";
import { CompanyUserDetailsUsecase } from "./company-user-details.usecase";
import { logger } from "../../../../../utils/logger";

export class CompanyUserDetailsController{
    constructor(
        private companyUserRepository: ICompanyUserRepository
    ){}
       
    async handle(req: Request, res: Response){

        try{
            const company_user_id = req.companyUserId

            const companyUserDetailsUsecase = new CompanyUserDetailsUsecase(
                this.companyUserRepository
            )

            const companyUser = await companyUserDetailsUsecase.execute(company_user_id)

            return res.json(companyUser)

        }catch(err:any){
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })
        }


    }
}