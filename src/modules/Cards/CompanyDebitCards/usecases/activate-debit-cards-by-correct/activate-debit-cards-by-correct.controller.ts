// import { Request, Response } from "express";
// import { IPartnerCardRepository } from "../../../PartnerCards/repositories/partner-card.repository";
// import { IEmployercardRepository } from "../../../EmployerCards/repositories/employer-card.repository";
// import { ICompanyTypeRepository } from "../../../../Company/CompanyType/repositories/company-type.repository";
// import { ICompanyDataRepository } from "../../../../Company/CompanyData/repositories/company-data.repository";
// import { ICards } from "../../../CardsByCorrect/repositories/cards-repository";
// import { PartnerCardsProps } from "../../../PartnerCards/entities/partner-cards.entity";
// import { ActivateDebitCardsByCorrectUsecase } from "./activate-debit-cards-by-correct.usecase";

// export class ActivateDebitCardsByCorrectController {
//     constructor(
//         private partnerCardRepository: IPartnerCardRepository,
//         private employerCardRepository: IEmployercardRepository,
//         private companyTypeRepository: ICompanyTypeRepository,
//         private companyDataRepository: ICompanyDataRepository,
//         private cards: ICards
//     ) { }

//     async handle(req: Request, res: Response) {
//         try {
//             const data: PartnerCardsProps = req.body
//             const cnpj = req.body.cnpj

//             data.card_id = 'sample_card_id'
//             data.total_installments = 0

//             const correctAdminId = req.correctAdminId

//             const debitCardUsecase = new ActivateDebitCardsByCorrectUsecase(
//                 this.partnerCardRepository,
//                 this.employerCardRepository,
//                 this.companyTypeRepository,
//                 this.companyDataRepository,
//                 this.cards
//             )

//             const activateDebitCard = await debitCardUsecase.execute(data, correctAdminId, cnpj)

//             return res.json(activateDebitCard)

//         } catch (err: any) {
//             return res.status(err.statusCode).json({
//                 error: err.message
//             })
//         }
//     }
// }