import { Request, Response } from "express";
import { logger } from "../../../../../../utils/logger";
import { DocumentValidationProps } from "../../../entities/app-user-document-validation.entity";
import { CreateDocumentsValidationUsecase } from "./create-documents-validation.usecase";
import { IAppUserDocumentValidationRepository } from "../../../repositories/app-user-document-validation.repository";
import { IAppUserInfoRepository } from "../../../repositories/app-user-info.repository";

export class CreateDocumentsValidationController{
    constructor(
        private userInfoRepository: IAppUserInfoRepository,
        private documentsValidationRepository: IAppUserDocumentValidationRepository

    ){}

    async handle(req: Request, res: Response){
        try{

            const data = req.body

            const document = req.params.document

            const documentsValidationUsecase = new CreateDocumentsValidationUsecase(
                this.userInfoRepository,
                this.documentsValidationRepository
            )

            await documentsValidationUsecase.execute(data, document)

            return res.status(201).json({success: "Documents registered successfully"})
            
        }catch(err: any){
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}