import { Request, Response } from "express";
import { ICompanyDataRepository } from "../../repositories/company-data.repository";
import { DeleteCompanyDataByCorrectUsecase } from "./delete-company-data.usecase";

export class DeleteCompanyDataByCorrectController {
    constructor(
        private companyDataRepository: ICompanyDataRepository
    ) { }

    async handle(req: Request, res: Response) {

        try {
            const business_id = req.body.company_document as string

            const deleteCompanyData = new DeleteCompanyDataByCorrectUsecase(
                this.companyDataRepository
            )

            await deleteCompanyData.execute(business_id)

            return res.json({ message: "Company data deleted successfully" })

        } catch (err: any) {
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}