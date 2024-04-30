import { Request, Response } from "express";
import { IAppUserInfoRepository } from "../../../repositories/app-user-info.repository";
import { logger } from "../../../../../../utils/logger";
import { GetUserInfoByDocumentUsecase } from "./get-user-info-by-document.usecase";

export class GetUserInfoByDocumentController{
    constructor(
        private userInfoRepository: IAppUserInfoRepository
    ){}

    async handle(req: Request, res: Response){
        try{
            const document = req.params.document as string
            const getByDocument = new GetUserInfoByDocumentUsecase(this.userInfoRepository)

            const user = await getByDocument.execute(document)

            return res.json(user)

        }catch(err: any){
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })

        }
    }
}