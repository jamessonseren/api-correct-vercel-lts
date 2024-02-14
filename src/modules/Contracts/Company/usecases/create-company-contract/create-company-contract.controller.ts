import { Request, Response } from "express";
import { logger } from "../../../../../utils/logger";
import { ICompanyContractRepository } from "../../repositories/implementations/company-contract.repository";
import { CompanyContractProps } from "../../entities/company-contract.entity";
import { CreateCompanyContractUsecase } from "./create-company-contract.usecase";

export class CreateCompanyContractController{
    constructor(
        private companyContractRepository: ICompanyContractRepository
    ){}

    async handle( req: Request, res: Response){
        try{
            const data: CompanyContractProps = req.body

            const contractUsecase = new CreateCompanyContractUsecase(this.companyContractRepository)

            const contract = await contractUsecase.execute(data)

            return contract
            
        }catch(err: any){
            logger.error(err.stack)
            res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}