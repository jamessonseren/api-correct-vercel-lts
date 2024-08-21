import { CorrectAdminPrismaRepository } from "../../repositories/implementations/correct-admin.prisma.repository";
import { FindCorrectAdminController } from "./find-correct-admin.controller";

const correctAdminRepository = new CorrectAdminPrismaRepository()

const findCorrectAdminController = new FindCorrectAdminController(correctAdminRepository)

export { findCorrectAdminController }
