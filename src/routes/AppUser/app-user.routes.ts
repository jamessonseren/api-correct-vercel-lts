import { Router } from "express";
import uploadConfig from '../../infra/shared/multer/multer.config'
import multer from 'multer'
import { correctIsAuth } from "../../infra/shared/middlewares/CorrectAdmin/correct-admin-auth.middleware";
import { authenticateAppUserController } from "../../modules/AppUser/AppUserManagement/usecases/app-user-authentication";
import { appUserIsAuth } from "../../infra/shared/middlewares/AppUser/app-user-auth.middleware";
import { appUsersignUpController } from "../../modules/AppUser/AppUserSignUp/usecases";
import { userDetailsController } from "../../modules/AppUser/AppUserManagement/usecases/app-user-details";
import { updateDocumentsController } from "../../modules/AppUser/AppUserManagement/usecases/update-documents-validation";
import { createAppUserByCorrectController } from "../../modules/AppUser/UserByCorrect/usecases/create-appuser-data-by-correct";

const appUserRouter = Router()
const upload = multer(uploadConfig.upload("./tmp"))

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

//Register app users by Correct
appUserRouter.post("/app-users-by-correct", correctIsAuth, upload.single('file'), async (request, response) => {
    await createAppUserByCorrectController.handle(request, response)
})
export { appUserRouter }