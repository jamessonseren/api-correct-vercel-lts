import { Router } from "express";
import { createCorrectAdminController } from "../../modules/CorrectAdmin/useCases/create-correct-admin";
import { authAdminController } from "../../modules/CorrectAdmin/useCases/authenticate-admin";

const correctAdminRouter = Router()

correctAdminRouter.post('/admin', async (request, response) => {
    await createCorrectAdminController.handle(request, response)
} )

correctAdminRouter.post('/login', async (request, response) => {
    await authAdminController.handle(request, response)
})


export { correctAdminRouter }