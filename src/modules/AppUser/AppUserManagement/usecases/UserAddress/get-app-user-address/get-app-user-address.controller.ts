import { Request, Response } from "express";
import { IAppUserAddressRepository } from "../../../repositories/app-user-address.repository";
import { IAppUserInfoRepository } from "../../../repositories/app-user-info.repository";
import { GetAppUserAddressUsecase } from "./get-app-user-address.usecase";

export class GetAppUserAddressController{
    constructor(
        private addressRepository: IAppUserAddressRepository,
        private userInfoRepository: IAppUserInfoRepository
    ){}

    async handle(req: Request, res: Response){

        try{

            const document = req.body.document as string

            const userAddressUsecase = new GetAppUserAddressUsecase(this.addressRepository, this.userInfoRepository)
            const result = await userAddressUsecase.execute(document)

            return res.status(200).json(result)

        }catch(err: any){
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}