import { CorrectAdminPrismaRepository } from "../../repositories/implementations/correct-admin.prisma.repository";
import { CreateCorrectAdminController } from "./create-correct-admin.controller";

const correctAdminRepository = new CorrectAdminPrismaRepository()
const createCorrectAdminController = new CreateCorrectAdminController(correctAdminRepository)

export { createCorrectAdminController }