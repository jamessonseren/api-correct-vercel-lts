import { Request, Response } from "express";
import { ICompanyContractRepository } from "../../repositories/implementations/company-contract.repository";
import { logger } from "../../../../../utils/logger";
import { FindSingleCompanyContractsUsecase } from "./find-single-company-contracts.usecase";

export class FindSingleCompanyContractsController{
    constructor(
        private companyContractsRepository: ICompanyContractRepository

    ){}
    async handle(req: Request, res: Response){

        try{
            const contract_uuid = req.query.contract_uuid as string

            const findContractsUsecase = new FindSingleCompanyContractsUsecase(this.companyContractsRepository)

            const contracts = await findContractsUsecase.execute(contract_uuid)

            return res.json(contracts)
        }catch(err: any){
            logger.error(err.stack)
            res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}