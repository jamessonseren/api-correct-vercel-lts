import { Request, Response } from "express";
import { ICompanyDataRepository } from "../../../CompanyData/repositories/company-data.repository";
import { ICompanyAddressRepository } from "../../repositories/company-address.repository";
import { CompanyAddressProps } from "../../entities/company-address.entity";
import { CreateCompanyAddressUsecase } from "./create-company-address.usecase";

export class CreateCompanyAddressController {
    constructor(
        private companyAddressRepository: ICompanyAddressRepository,
    ) { }

    async handle(req: Request, res: Response) {
        try {
            const data: CompanyAddressProps = req.body


            const companyAddressUsecase = new CreateCompanyAddressUsecase(
                this.companyAddressRepository,
            )

            const companyAddress = await companyAddressUsecase.execute(data)

            return res.json(companyAddress)
        } catch (err: any) {
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}