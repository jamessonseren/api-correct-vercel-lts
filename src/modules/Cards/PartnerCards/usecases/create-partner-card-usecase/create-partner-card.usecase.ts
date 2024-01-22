// import { CustomError } from "../../../../../errors/custom.error";
// import { ICompanyDataRepository } from "../../../../Company/CompanyData/repositories/company-data.repository";
// import { ICompanyTypeRepository } from "../../../../Company/CompanyType/repositories/company-type.repository";
// import { ICards } from "../../../CardsByCorrect/repositories/cards-repository";
// import { PartnerCardsEntity, PartnerCardsProps } from "../../entities/partner-cards.entity";
// import { IPartnerCardRepository } from "../../repositories/partner-card.repository";

// export class CreatePartnerCardsUsecase {
//     constructor(
//         private partnerCardRepository: IPartnerCardRepository,
//         private companyTypeRepository: ICompanyTypeRepository,
//         private companyDataRepository: ICompanyDataRepository,
//         private cards: ICards
//     ) { }

//     async execute(data: PartnerCardsProps, companyAdminId: string) {

//         const partnerCard = await PartnerCardsEntity.create(data)

//         //get Cards
//         const cards = await this.cards.findById(data.card_id)
//         if(!cards) throw new CustomError("Card not found - check Card ID", 400)

//         //check if company data is already registered
//         const findCompanyData = await this.companyDataRepository.findByCompanyAdmin(companyAdminId)
//         if (!findCompanyData) throw new CustomError("Company data must be completed", 400)

//         //check if company type is already registered
//         const findCompanyType = await this.companyTypeRepository.findByCompanyUserId(companyAdminId)
//         if (!findCompanyType) throw new CustomError("Company type must be registered first", 400)

//         //check if card is already hired - find by Card Id FK
//         const findBycardId = await this.partnerCardRepository.findByCardId(data.card_id)
//         if (findBycardId) throw new CustomError("Card is already hired", 409)

//         partnerCard.company_type_id = findCompanyType.id

//         if(cards.card_type !== 'pos_pago'){
//             partnerCard.total_installments = 1
//             const hirePrePagoCard = await this.partnerCardRepository.save(partnerCard)
//             return hirePrePagoCard
//         }

//         const hirePosPagoCard = await this.partnerCardRepository.save(partnerCard)
//             return hirePosPagoCard
//     }

   
// }