import { Request, Response } from "express";
import { logger } from "../../../../../utils/logger";
import { UserValidationUpdate } from "../../../app-user-dto/app-user.dto";
import { UpdateDocumentsValidationUsecase } from "./update-documents-validation.usecase";
import { IAppUserValidationDocumentsRepository } from "../../repositories/app-user-validations-documents-repository.repository";

export class UpdateDocumentsValidationController{
    constructor(
        private userValidationRepository: IAppUserValidationDocumentsRepository

    ){}

    async handle(req: Request, res: Response){
        try{

            const data: UserValidationUpdate = req.body

            data.uuid = req.query.document_uuid as string
            
            const updateDocumentsUsecase = new UpdateDocumentsValidationUsecase(this.userValidationRepository)

            const updateDocuments = await updateDocumentsUsecase.execute(data)

            return res.json(updateDocuments)
        }catch(err: any){
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}