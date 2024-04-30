import { Request, Response } from "express";
import { logger } from "../../../../../../utils/logger";
import { DocumentValidationProps } from "../../../entities/app-user-document-validation.entity";
import { CreateDocumentsValidationUsecase } from "./create-documents-validation.usecase";
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository";
import { IAppUserDocumentValidationRepository } from "../../../repositories/app-user-document-validation.repository";

export class CreateDocumentsValidationController{
    constructor(
        private userAuthRepository: IAppUserAuthRepository,
        private documentsValidationRepository: IAppUserDocumentValidationRepository

    ){}

    async handle(req: Request, res: Response){
        try{

            const data: DocumentValidationProps = req.body

            const user_id = req.appUserId

            const documentsValidationUsecase = new CreateDocumentsValidationUsecase(
                this.userAuthRepository,
                this.documentsValidationRepository
            )

            await documentsValidationUsecase.execute(data, user_id)

            return res.status(201).json({success: "Documents registered successfully"})
            
        }catch(err: any){
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}