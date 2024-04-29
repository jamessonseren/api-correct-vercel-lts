import { Request, Response } from "express";
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository";
import { GetByDocumentUsecase } from "./get-by-document.usecase";
import { logger } from "../../../../../../utils/logger";

export class GetByDocumentController {
    constructor(
        private appUserRepository: IAppUserAuthRepository
    ) { }

    async handle(req: Request, res: Response) {

        try {
            const document = req.params.document as string
            const getByDocument = new GetByDocumentUsecase(this.appUserRepository)

            const user = await getByDocument.execute(document)

            return res.json(user)

        } catch (err: any) {
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })
        }

    }
}