import { Router } from "express";
import uploadConfig from '../../infra/shared/multer/multer.config'
import multer from 'multer'
import { correctIsAuth } from "../../infra/shared/middlewares/CorrectAdmin/correct-admin-auth.middleware";
import { authenticateAppUserController } from "../../modules/AppUser/AppUserManagement/usecases/app-user-authentication";
import { appUserIsAuth } from "../../infra/shared/middlewares/AppUser/app-user-auth.middleware";
import { appUsersignUpController } from "../../modules/AppUser/AppUserSignUp/usecases";
import { userDetailsController } from "../../modules/AppUser/AppUserManagement/usecases/app-user-details";
import { updateDocumentsController } from "../../modules/AppUser/AppUserManagement/usecases/update-documents-validation";

const appUserRouter = Router()


//AppUserSignup - First Register
appUserRouter.post('/new-app-user', async (request, response) => {
    await appUsersignUpController.handle(request, response)
})

//Login AppUser
appUserRouter.post("/login-app-user", async (request, response) => {
    await authenticateAppUserController.handle(request, response)
})

//User details Authenticated
appUserRouter.get("/app-user", appUserIsAuth, async (request, response) => {
    await userDetailsController.handle(request, response)
})

//Update documents for validation
appUserRouter.patch("/app-user", appUserIsAuth, async (request, response) => {
    await updateDocumentsController.handle(request, response)
})
//create / update appuser data by appuser
// appUserRouter.post("/app-user-data", appUserIsAuth, async (request, response) => {
//     await createAppUserDataController.handle(request, response)
// })

export { appUserRouter }