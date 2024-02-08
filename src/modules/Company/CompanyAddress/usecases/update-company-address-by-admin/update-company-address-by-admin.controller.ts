import { Request, Response } from "express";
import { CompanyAddressEntity } from "../../entities/company-address.entity";
import { UpdateCompanyDataAndAddressByAdminUsecase } from "./update-company-address-by-admin.usecase";
import { ICompanyAddressRepository } from "../../repositories/company-address.repository";
import { UpdateBusinessInfoUsecase } from "../../../CompanyData/usecases/update-business-info/update-business-info.usecase";
import { ICompanyDataRepository } from "../../../CompanyData/repositories/company-data.repository";
import { CompanyDataEntity } from "../../../CompanyData/entities/company-data.entity";

export class UpdateCompanyDataAndAddressByAdminController {
    constructor(
        private companyAddressRepository: ICompanyAddressRepository,
        private companyDataRepository: ICompanyDataRepository


    ) { }

    async handle(req: Request, res: Response) {

        try {
            const address: CompanyAddressEntity = {...req.body}
            const data: CompanyDataEntity = {...req.body}
            
            address.uuid = req.query.address_uuid as string

            data.uuid = req.query.data_uuid as string
            const companyAddressUsecase = new UpdateCompanyDataAndAddressByAdminUsecase(this.companyAddressRepository)
            const companyDataUsecase = new UpdateBusinessInfoUsecase(this.companyDataRepository)

            await companyAddressUsecase.execute(address)
            await companyDataUsecase.execute(data)
            
            return res.json({message: "Info updated successfully"})

        } catch (err: any) {
            return res.status(err.statusCode).json({
                error: err.message
            })

        }
    }
}