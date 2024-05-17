import { Request, Response } from "express";
import {  AppUserInfoProps } from "../../../entities/app-user-info.entity";
import { IAppUserInfoRepository } from "../../../repositories/app-user-info.repository";
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository";
import { AppUserInfoUsecase } from "./create-user-info.usecase";
import { logger } from "../../../../../../utils/logger";

export class CreateUserInfoController{
    constructor(
        private appUserInfoRepository: IAppUserInfoRepository,
        private appUserAuthRepository: IAppUserAuthRepository

    ){}

    async handle(req: Request, res: Response){

        try{

            const data:AppUserInfoProps = req.body
    
            const user_id = req.appUserId
    
            const userInfoUsecase = new AppUserInfoUsecase(this.appUserInfoRepository, this.appUserAuthRepository)
    
            await userInfoUsecase.execute(data, user_id)
            
            return res.status(201).json({sucess: "User info registered successfully"})
        }catch(err: any){
            logger.error(err.stack);
            return res.status(err.statusCode).json({
                error: err.message,
            });
        }
    }
}