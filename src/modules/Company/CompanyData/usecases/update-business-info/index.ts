import { CompanyDataPrismaRepository } from "../../repositories/implementations/prisma/company-data-prisma.repository"
import { UpdateBusinessInfoController } from "./update-business-info.controller";

const businessInfoRepository = new CompanyDataPrismaRepository()
const updateBusinessInfo = new UpdateBusinessInfoController(businessInfoRepository)

export { updateBusinessInfo }