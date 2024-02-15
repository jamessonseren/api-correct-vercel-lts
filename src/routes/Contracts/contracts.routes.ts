import { Router } from "express";
import { companyIsAuth } from "../../infra/shared/middlewares/CompanyAdmin/company-admin-auth.middlware";
import { createCompanyContractController } from "../../modules/Contracts/Company/usecases/create-company-contract";

export const contractsRouter = Router()


//create company contract
contractsRouter.post("/company-contract", companyIsAuth, async (request, response) => {
    await createCompanyContractController.handle(request, response)
})

