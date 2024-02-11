import { Router } from "express";
import { companyIsAuth } from "../../infra/shared/middlewares/CompanyAdmin/company-admin-auth.middlware";
import { updateAddressController } from "../../modules/Company/CompanyAddress/usecases/update-company-address-by-admin";

export const companyAddressRouter = Router()



//update company Data and Address by company admin
companyAddressRouter.patch('/company-data', companyIsAuth, async (request, response) => {
    await updateAddressController.handle(request, response)
})

