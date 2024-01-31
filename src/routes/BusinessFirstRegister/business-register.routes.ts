import { Router } from "express";
import { businessRegisterController } from "../../modules/Company/BusinessFirstRegister/usecases/business-first-register";
// import { deleteCompanyDataController } from "../../modules/Company/CompanyData/usecases/delete-company-data";

export const businessRegisterRouter = Router()

//create company data
businessRegisterRouter.post('/business-register', async (request, response) => {
    await businessRegisterController.handle(request, response)
})
