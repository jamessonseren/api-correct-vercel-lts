import { Router } from "express";
import { companyUserController } from "../../modules/Company/CompanyUser/usecases/create-company-admin";
import { authCompanyUserController } from "../../modules/Company/CompanyUser/usecases/authenticate-company-user";
import { companyIsAuth } from "../../infra/shared/middlewares/CompanyAdmin/company-admin-auth.middlware";
import { companyUserDetailsController } from "../../modules/Company/CompanyUser/usecases/company-user-details";
import { updateUserController } from "../../modules/Company/CompanyUser/usecases/update-user-by-admin";
import { deleteUserController } from "../../modules/Company/CompanyUser/usecases/delete-user";
import { getUsersController } from "../../modules/Company/CompanyUser/usecases/get-users";
import { getSingleUserController } from "../../modules/Company/CompanyUser/usecases/get-single-user";
import { correctIsAuth } from "../../infra/shared/middlewares/CorrectAdmin/correct-admin-auth.middleware";
import { companyUserByAdminController } from "../../modules/Company/CompanyUser/usecases/create-company-user";
import { confirmPasswordController } from "../../modules/Company/CompanyUser/usecases/confirm-password";


export const companyUserRouter = Router()

// //Create Company admin by correct
companyUserRouter.post('/business/admin/correct', correctIsAuth, async (request, response) => {
    await companyUserController.handle(request, response)
})


companyUserRouter.post('/business/admin/login', async (request, response) => {
    await authCompanyUserController.handle(request, response)
})

//get user details
companyUserRouter.get('/business/admin/details', companyIsAuth, async (request, response) => {
    await companyUserDetailsController.handle(request, response)
})

//create company user by company admin
companyUserRouter.post('/business/admin/register/user', companyIsAuth, async (request, response) => {
    await companyUserByAdminController.handle(request, response)
})

//get single User
companyUserRouter.get("/business/admin/details/user", async (request, response) => {
    await getSingleUserController.handle(request, response)
})

//get users by authenticated admin
companyUserRouter.get('/company-users', companyIsAuth, async (request, response) => {
    await getUsersController.handle(request, response)
})


//update company user by company admin
companyUserRouter.patch("/company-user", companyIsAuth, async (request, response) => {
    await updateUserController.handle(request, response)
})

//Delete User By company Admin
companyUserRouter.delete("/company-user", companyIsAuth, async (request, response) => {
    await deleteUserController.handle(request, response)
})

//Password confirmation
companyUserRouter.post("/confirm-password", companyIsAuth, async (request, response) => {
    await confirmPasswordController.handle(request, response)
})