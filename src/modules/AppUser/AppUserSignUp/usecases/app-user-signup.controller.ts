import { Request, Response } from "express";
import { IAppUserSignupRepository } from "../repositories/app-user-signup.repository";
import { AppUserProps } from "../entities/app-user-signup.entity";
import { AppUserSignUpUsecase } from "./app-user.signup.usecase";
import { logger } from "../../../../utils/logger";
import { IAppUserInfoRepository } from "../../AppUserManagement/repositories/app-user-info.repository";

export class AppUserSignUpController {
    constructor(
        private appUserSignUpRepository: IAppUserSignupRepository,
        private appUserInfoRepository: IAppUserInfoRepository

        ) { }

    async handle(req: Request, res: Response) {
        try {
            const data: AppUserProps = req.body;

        
            const appUserSignUpUsecase = new AppUserSignUpUsecase(this.appUserSignUpRepository, this.appUserInfoRepository);
            await appUserSignUpUsecase.execute(data);

            return res.json({message: "User created successfully"});
        } catch (err: any) {
            logger.error(err.stack);
            return res.status(err.statusCode).json({
                error: err.message,
            });
        }
    }
}
