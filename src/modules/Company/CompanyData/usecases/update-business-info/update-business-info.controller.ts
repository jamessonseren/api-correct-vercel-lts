import { Request, Response } from "express";
import { ICompanyDataRepository } from "../../repositories/company-data.repository";
import { UpdateBusinessInfoUsecase } from "./update-business-info.usecase";
import { CompanyDataEntity } from "../../entities/company-data.entity";
import { logger } from "../../../../../utils/logger";

export class UpdateBusinessInfoController {
    constructor(
        private businessInfoRepository: ICompanyDataRepository,

    ){}

    async handle(req: Request, res: Response){
        try{
            const data:CompanyDataEntity = req.body
    
            data.uuid = req.query.business_info_uuid as string
    
            const updateBusinessInfoUsecase = new UpdateBusinessInfoUsecase(this.businessInfoRepository)
    
            await updateBusinessInfoUsecase.execute(data)
            
            return res.json({message: "Info updated successfully"})

        }catch(err: any){
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}