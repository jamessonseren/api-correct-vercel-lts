import { Request, Response } from "express";
import { IPasswordCrypto } from "../../../../../crypto/password.crypto";
import { ICompanyAdminToken } from "../../../../../infra/shared/crypto/token/CompanyAdmin/token";
import { ICompanyUserRepository } from "../../repositories/company-user.repository";
import { AuthenticateCompanyUserUsecase } from "./authenticate-company-user.usecase";

export class AuthenticateCompanyAdminController{
    constructor(
        private companyUserRepository: ICompanyUserRepository,
        private passwordCrypto: IPasswordCrypto,
        private token: ICompanyAdminToken
    ){}

    async handle(req: Request, res: Response){
        try{
            const { business_document, user_name, password} = req.body

            const authCompanyUserUsecase = new AuthenticateCompanyUserUsecase(
                this.companyUserRepository,
                this.passwordCrypto,
                this.token
            )

            const companyUser = await authCompanyUserUsecase.execute({business_document, user_name, password})

            return res.json(companyUser)

        }catch(err: any){
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}