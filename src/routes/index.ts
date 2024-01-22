import { Router } from "express";
import { correctAdminRouter } from "./CorrectAdmin/correct-admin.routes";
import { companyUserRouter } from "./CompanyUser/company-user.routes";
import { companyDataRouter } from "./CompanyData/company-data.routes";
import { appUserRouter } from "./AppUser/app-user.routes";
// import { cardsRouter } from "./Cards/cards.routes";
// import { accountsRouter } from "./Accounts/app-user-accounts.routes";
import { companyAddressRouter } from "./CompanyAddress/company-address.routes";

const router = Router()

router.use(correctAdminRouter)
router.use(companyUserRouter)
router.use(companyDataRouter)
router.use(appUserRouter)
router.use(companyAddressRouter)

export { router }