import { Router } from "express";
import { createAppUserByCorrectController } from "../../modules/AppUser/UserByCorrect/usecases/create-appuser-data-by-correct";
// import { createAppUserByUserController } from "../../modules/AppUser/AppUserManagement/usecases/create-by-user";
import uploadConfig from '../../infra/shared/multer/multer.config'
import multer from 'multer'
import { correctIsAuth } from "../../infra/shared/middlewares/CorrectAdmin/correct-admin-auth.middleware";
import { authenticateAppUserController } from "../../modules/AppUser/AppUserManagement/usecases/create-by-user/app-user-authentication";
import { appUserIsAuth } from "../../infra/shared/middlewares/AppUser/app-user-auth.middleware";
import { createAppUserDataController } from "../../modules/AppUser/UserByCorrect/usecases/create-appuser-data-by-user";

const upload = multer(uploadConfig.upload("./tmp"))

const appUserRouter = Router()

//Create Appuser by User
// appUserRouter.post('/new-app-user', async (request, response) => {
//     await createAppUserByUserController.handle(request, response)
// })

//create AppUser By correct Admin
appUserRouter.post("/app-users", correctIsAuth, upload.single('file'), async (request, response) => {
    await createAppUserByCorrectController.handle(request, response)
})

//Login AppUser
appUserRouter.post("/login-app-user", async (request, response) => {
    await authenticateAppUserController.handle(request, response)
})

//create / update appuser data by appuser
appUserRouter.post("/app-user-data", appUserIsAuth, async (request, response) => {
    await createAppUserDataController.handle(request, response)
})

export { appUserRouter }