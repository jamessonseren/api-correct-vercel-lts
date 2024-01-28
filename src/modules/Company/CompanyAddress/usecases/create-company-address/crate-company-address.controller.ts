import { Request, Response } from "express";
import { ICompanyDataRepository } from "../../../CompanyData/repositories/company-data.repository";
import { ICompanyAddressRepository } from "../../repositories/company-address.repository";
import { CompanyAddressProps } from "../../entities/company-address.entity";
import { CreateCompanyAddressUsecase } from "./create-company-address.usecase";
import { CompanyDataRequest } from "../../../CompanyData/companyDataDto/company-data.dto";
import { CreateCompanyDataUsecase } from "../../../CompanyData/usecases/create-company-data/create-company-data.usecase";

export class CreateCompanyAddressController {
    constructor(
        private companyAddressRepository: ICompanyAddressRepository,
        private companyDataRepository: ICompanyDataRepository

    ) { }

    async handle(req: Request, res: Response) {
        try {
            const addressData: CompanyAddressProps = req.body

            const businessData: CompanyDataRequest = req.body

            const companyAddressUsecase = new CreateCompanyAddressUsecase(
                this.companyAddressRepository,
                
            )

            const companyAddress = await companyAddressUsecase.execute(addressData)

            const companyDataUsecase = new CreateCompanyDataUsecase(
                this.companyDataRepository
            )
            
            businessData.address_uuid = companyAddress.uuid
            
            await companyDataUsecase.execute(businessData)
            
            return res.json({ message: "Company Registered successfully"})
        } catch (err: any) {
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}