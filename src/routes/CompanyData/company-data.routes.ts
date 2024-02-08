import { Router, request } from "express";
import { correctIsAuth } from "../../infra/shared/middlewares/CorrectAdmin/correct-admin-auth.middleware";
import { updateBusinessInfo } from "../../modules/Company/CompanyData/usecases/update-business-info";

export const companyDataRouter = Router()

//update company data by Correct Admin
companyDataRouter.patch('/business-info-by-correct', correctIsAuth, async (request, response) => {
    await updateBusinessInfo.handle(request, response)
})

