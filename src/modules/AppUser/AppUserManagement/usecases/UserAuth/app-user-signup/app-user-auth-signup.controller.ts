import { Request, Response } from "express";
import { logger } from "../../../../../../utils/logger";
import { AppUserAuthProps } from "../../../entities/app-user-auth.entity";
import { AppUserAuthSignUpUsecase } from "./app-user-auth.signup.usecase";
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository";
import { IAppUserInfoRepository } from "../../../repositories/app-user-info.repository";

export class AppUserAuthSignUpController {
    constructor(
        private appUserSingUpRepository: IAppUserAuthRepository,
        private appUserInfoRepository: IAppUserInfoRepository


        ) { }

    async handle(req: Request, res: Response) {
        try {
            const data: AppUserAuthProps = req.body;
        
            const appUserSignUpUsecase = new AppUserAuthSignUpUsecase(this.appUserSingUpRepository, this.appUserInfoRepository);
            await appUserSignUpUsecase.execute(data);

            return res.status(201).json({message: "User created successfully"});
            
        } catch (err: any) {
            logger.error(err.stack);
            return res.status(err.statusCode).json({
                error: err.message,
            });
        }
    }
}
