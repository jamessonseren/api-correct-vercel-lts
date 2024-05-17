import { Response, Request } from "express";
import { IAppUserInfoRepository } from "../../../repositories/app-user-info.repository";
import { ICompanyUserRepository } from "../../../../../Company/CompanyUser/repositories/company-user.repository";
import { GetUsersByBusinessAdminUsecase } from "./get-users-by-business-admin.usecasse";

export class GetUsersByBusinessAdminController{
    constructor(
        private appUsersRepository: IAppUserInfoRepository,
        private businessUserRepository: ICompanyUserRepository
    ){}

    async handle(req: Request, res: Response){

        try{
            const user_uuid = req.companyUserId

            const usecase = new GetUsersByBusinessAdminUsecase(this.appUsersRepository, this.businessUserRepository)

            const result = await usecase.execute(user_uuid)

            return res.json(result)

        }catch(err: any){

            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}