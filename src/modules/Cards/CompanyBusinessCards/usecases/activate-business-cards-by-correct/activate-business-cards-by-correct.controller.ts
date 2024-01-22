// import { Request, Response } from "express";
// import { ICompanyDataRepository } from "../../../../Company/CompanyData/repositories/company-data.repository";
// import { ICompanyTypeRepository } from "../../../../Company/CompanyType/repositories/company-type.repository";
// import { ICards } from "../../../CardsByCorrect/repositories/cards-repository";
// import { PartnerCardsProps } from "../../../PartnerCards/entities/partner-cards.entity";
// import { IPartnerCardRepository } from "../../../PartnerCards/repositories/partner-card.repository";
// import { ActivateBusinessCardsByCorrectUsecase } from "./activate-business-cards-by-correct.usecase";
// import { IEmployercardRepository } from "../../../EmployerCards/repositories/employer-card.repository";

// export class ActivateBusinessCardsByCorrectController {
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

            

//             const businessCardUsecase = new ActivateBusinessCardsByCorrectUsecase(
//                 this.partnerCardRepository,
//                 this.employerCardRepository,
//                 this.companyTypeRepository,
//                 this.companyDataRepository,
//                 this.cards
//             )

//             const activateBusinessCard = await businessCardUsecase.execute(data, cnpj)

//             return res.json(activateBusinessCard)

//         } catch (err: any) {
//             return res.status(err.statusCode).json({
//                 error: err.message
//             })
//         }
//     }
// }