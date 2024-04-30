import { Router, response } from "express";
import uploadConfig from '../../infra/shared/multer/multer.config'
import multer from 'multer'
import { authenticateAppUserController } from "../../modules/AppUser/AppUserManagement/usecases/UserAuth/app-user-authentication";
import { appUserIsAuth } from "../../infra/shared/middlewares/AppUser/app-user-auth.middleware";
import { userDetailsController } from "../../modules/AppUser/AppUserManagement/usecases/UserAuth/app-user-details";
import { createDocumentsController } from "../../modules/AppUser/AppUserManagement/usecases/DocumentsValidation/create-documents-validation";
import { appUserAuthSignUpController } from "../../modules/AppUser/AppUserManagement/usecases/UserAuth/app-user-signup";
import { getByDocumentController } from "../../modules/AppUser/AppUserManagement/usecases/UserAuth/get-by-document";
import { createUserInfoController } from "../../modules/AppUser/AppUserManagement/usecases/UserInfo/create-user-info";
import { createUserAddressController } from "../../modules/AppUser/AppUserManagement/usecases/UserAddress/create-app-user-address";
import { correctIsAuth } from "../../infra/shared/middlewares/CorrectAdmin/correct-admin-auth.middleware";
import { createAppUserByCorrectController } from "../../modules/AppUser/UserByCorrect/usecases/create-appuser-data-by-correct";
import { getUserInfoController } from "../../modules/AppUser/AppUserManagement/usecases/UserInfo/get-by-document";

const appUserRouter = Router()
const upload = multer(uploadConfig.upload("./tmp"))

//sign up user
appUserRouter.post('/app-user', async (request, response) => {
    await appUserAuthSignUpController.handle(request, response)
})

//Login AppUser
appUserRouter.post("/login-app-user", async (request, response) => {
    await authenticateAppUserController.handle(request, response)
})

//User details Authenticated
appUserRouter.get("/app-user", appUserIsAuth, async (request, response) => {
    await userDetailsController.handle(request, response)
})

//user Details by document
appUserRouter.get("/app-user/document/:document", async (request, response) => {
    await getByDocumentController.handle(request, response)
})

//get User Info by document
appUserRouter.get("/app-user-info/document/:document", async (request, response) => {
    await getUserInfoController.handle(request, response)
})
//register user info by authenticated user
appUserRouter.post("/app-user/info", appUserIsAuth, async (request, response) => {
    await createUserInfoController.handle(request, response)
})

//register user info by authenticated user
appUserRouter.post("/app-user/address", appUserIsAuth, async (request, response) => {
    await createUserAddressController.handle(request, response)
})


//create documents for validation
appUserRouter.post("/app-user/document-validation", appUserIsAuth, async (request, response) => {
    await createDocumentsController.handle(request, response)
})


//Register app users by Correct
appUserRouter.post("/app-users-by-correct", correctIsAuth, upload.single('file'), async (request, response) => {
    await createAppUserByCorrectController.handle(request, response)
})



export { appUserRouter }