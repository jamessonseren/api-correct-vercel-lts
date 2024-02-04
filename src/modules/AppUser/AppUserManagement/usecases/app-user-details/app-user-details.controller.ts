import { Request, Response } from "express";
import { IAppUserAuthRepository } from "../../repositories/app-use-auth-repository";
import { AppUserDetailsUsecase } from "./app-user-details.usecase";
import { logger } from "../../../../../utils/logger";

export class AppUserDetailsController {
    constructor(
        private appUserRepository: IAppUserAuthRepository

    ){}

    async handle(req: Request, res: Response){
        try{
            const user_uuid = req.appUserId

            const userDetailsUsecase = new AppUserDetailsUsecase(this.appUserRepository)

            const userDetails = await userDetailsUsecase.execute(user_uuid)

            return res.json(userDetails)
        }catch(err: any){
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}