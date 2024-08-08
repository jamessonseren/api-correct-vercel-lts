import { Request, Response } from "express";
import { CreateAppUserAddressUsecase } from "./create-app-user-address.usecase";
import { IAppUserAddressRepository } from "../../../repositories/app-user-address.repository";

export class CreateAppUserAddressController{
    constructor(
        private addressRepository: IAppUserAddressRepository,
    ){}

    async handle(req: Request, res: Response){
        try{
            const data = req.body
        
            const addressUsecase = new CreateAppUserAddressUsecase(this.addressRepository)

            const result = await addressUsecase.execute(data)

            return res.status(201).json(result)

        }catch(err: any){
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}