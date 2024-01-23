import { Router, request, response } from "express";
import { companyUserController } from "../../modules/Company/CompanyUser/usecases/create-company-user";
import { authCompanyUserController } from "../../modules/Company/CompanyUser/usecases/authenticate-company-user";
import { companyIsAuth } from "../../infra/shared/middlewares/CompanyAdmin/company-admin-auth.middlware";
import { companyUserDetailsController } from "../../modules/Company/CompanyUser/usecases/company-user-details";
import { updateUserController } from "../../modules/Company/CompanyUser/usecases/update-user-by-admin";
import { deleteUserController } from "../../modules/Company/CompanyUser/usecases/delete-user-by-admin";
import { getUsersController } from "../../modules/Company/CompanyUser/usecases/get-users";
import { getSingleUserController } from "../../modules/Company/CompanyUser/usecases/get-single-user";


export const companyUserRouter = Router()

companyUserRouter.post('/company-user', async (request, response) => {
    await companyUserController.handle(request, response)
})

companyUserRouter.post('/company-user-login', async (request, response) => {
    await authCompanyUserController.handle(request, response)
})

//get user details
companyUserRouter.get('/company-user-details', companyIsAuth, async (request, response) => {
    await companyUserDetailsController.handle(request, response)
})

//get single User
companyUserRouter.get("/company-user", async (request, response) => {
    await getSingleUserController.handle(request, response)
})

//get users 
companyUserRouter.get('/company-users', companyIsAuth, async (request, response) => {
    await getUsersController.handle(request, response)
})


//update company user by company admin
companyUserRouter.put("/company-user", companyIsAuth, async (request, response) => {
    await updateUserController.handle(request, response)
})

//Delete User By company Admin
companyUserRouter.delete("/company-user", companyIsAuth, async (request, response) => {
    await deleteUserController.handle(request, response)
})