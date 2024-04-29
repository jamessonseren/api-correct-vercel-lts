import { Request, Response } from "express";
import { AppUserAddressProps } from "../../../entities/app-user-address.entity";
import { CreateAppUserAddressUsecase } from "./create-app-user-address.usecase";
import { IAppUserAddressRepository } from "../../../repositories/app-user-address.repository";
import { logger } from "../../../../../../utils/logger";
import { IAppUserAuthRepository } from "../../../repositories/app-use-auth-repository";

export class CreateAppUserAddressController{
    constructor(
        private addressRepository: IAppUserAddressRepository,
        private userAuthRepository: IAppUserAuthRepository
    ){}

    async handle(req: Request, res: Response){
        try{
            const data:AppUserAddressProps = req.body
            const user_id = req.appUserId

            const addressUsecase = new CreateAppUserAddressUsecase(this.addressRepository, this.userAuthRepository)

            const result = await addressUsecase.execute(data, user_id)

            return res.status(201).json(result)

        }catch(err: any){
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}