import { Request, Response } from "express";
import { ICompanyUserRepository } from "../../repositories/company-user.repository";
import { logger } from "../../../../../utils/logger";
import { GetSingleUserUsecase } from "./get-users.usecase";

export class GetSingleUserController{
    constructor(
        private companyUserRepository: ICompanyUserRepository
    ) {}

    async handle(req: Request, res: Response){
        try{

            const business_document = req.query.business_document as string

            const getSingleUserUsecase = new GetSingleUserUsecase(this.companyUserRepository)

            const users = await getSingleUserUsecase.execute(business_document)
            
            return res.json(users)

        }catch(err: any){
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}