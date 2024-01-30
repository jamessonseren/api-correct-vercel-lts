import { Router } from "express";
import { companyIsAuth } from "../../infra/shared/middlewares/CompanyAdmin/company-admin-auth.middlware";
import { createCompanyAddressController } from "../../modules/Company/CompanyAddress/usecases/create-company-address";
import { getCompanyAddressController } from "../../modules/Company/CompanyAddress/usecases/get-company-address";
import { updateAddressController } from "../../modules/Company/CompanyAddress/usecases/update-company-address-by-admin";

export const companyAddressRouter = Router()

//register company address
companyAddressRouter.post("/company-address", async (request, response) => {
    await createCompanyAddressController.handle(request, response)
})

//update company Data and Address by company admin
companyAddressRouter.put('/company-info', companyIsAuth, async (request, response) => {
    await updateAddressController.handle(request, response)
})

//get by company data id
companyAddressRouter.get("/company-address", companyIsAuth, async (request, response) => {
    await getCompanyAddressController.handle(request, response)
})