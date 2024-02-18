import { Request, Response } from "express";
import { ICompanyContractRepository } from "../../repositories/implementations/company-contract.repository";
import { logger } from "../../../../../utils/logger";
import { FindCompanyContractsUsecase } from "./find-company-contracts.usecase";

export class FindCompanyContractsController{
    constructor(
        private companyContractsRepository: ICompanyContractRepository

    ){}
    async handle(req: Request, res: Response){

        try{
            const business_info_uuid = req.query.business_info_uuid as string

            const findContractsUsecase = new FindCompanyContractsUsecase(this.companyContractsRepository)

            const contracts = await findContractsUsecase.execute(business_info_uuid)

            return res.json(contracts)
        }catch(err: any){
            logger.error(err.stack)
            res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}