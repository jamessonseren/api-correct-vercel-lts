// import { Request, Response } from "express";
// import { IPartnerCardRepository } from "../../repositories/partner-card.repository";
// import { ICompanyTypeRepository } from "../../../../Company/CompanyType/repositories/company-type.repository";
// import { ICompanyDataRepository } from "../../../../Company/CompanyData/repositories/company-data.repository";
// import { PartnerCardsProps } from "../../entities/partner-cards.entity";
// import { CreatePartnerCardsUsecase } from "./create-partner-card.usecase";
// import { ICards } from "../../../CardsByCorrect/repositories/cards-repository";

// export class CreatePartnerCardController {
//     constructor(
//         private partnerCardRepository: IPartnerCardRepository,
//         private companyTypeRepository: ICompanyTypeRepository,
//         private companyDataRepository: ICompanyDataRepository,
//         private cards: ICards
//     ) { }

//     async handle(req: Request, res: Response) {

//         try {
//             const data: PartnerCardsProps = req.body

//             data.card_id = req.query.cardId as string
            
//             const company_admin_id = req.companyUserId

//             const partnerCardUsecase = new CreatePartnerCardsUsecase(
//                 this.partnerCardRepository,
//                 this.companyTypeRepository,
//                 this.companyDataRepository,
//                 this.cards
//             )

//             const partnerCard = await partnerCardUsecase.execute(data, company_admin_id)

//             return res.json(partnerCard)
//         } catch (err: any) {
//             return res.status(err.statusCode).json({
//                 error: err.message
//             })
//         }
//     }
// }