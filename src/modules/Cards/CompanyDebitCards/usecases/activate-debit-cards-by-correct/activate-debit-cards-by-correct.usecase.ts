// import { CustomError } from "../../../../../errors/custom.error";
// import { ICompanyDataRepository } from "../../../../Company/CompanyData/repositories/company-data.repository";
// import { ICompanyTypeRepository } from "../../../../Company/CompanyType/repositories/company-type.repository";
// import { ICards } from "../../../CardsByCorrect/repositories/cards-repository";
// import { EmployerCardsEntity } from "../../../EmployerCards/entities/employer-cards.entity";
// import { IEmployercardRepository } from "../../../EmployerCards/repositories/employer-card.repository";
// import { PartnerCardsEntity, PartnerCardsProps } from "../../../PartnerCards/entities/partner-cards.entity";
// import { IPartnerCardRepository } from "../../../PartnerCards/repositories/partner-card.repository";

// export class ActivateDebitCardsByCorrectUsecase{
//     constructor(
//         private partnerCardRepository: IPartnerCardRepository,
//         private employerCardRepository: IEmployercardRepository,
//         private companyTypeRepository: ICompanyTypeRepository,
//         private companyDataRepository: ICompanyDataRepository,
//         private cards: ICards
//     ) {}

//     async execute(data: PartnerCardsProps, correctAdminId: string, cnpj: string) {

//         if(!cnpj) throw new CustomError("Company CNPJ is required", 401)

        
//         //find business card
//         const findDebitCard = await this.cards.findByName("Debito")
//         if(!findDebitCard) throw new CustomError("Can not find any account called 'Debito'", 400)
        
//         //check if company data is already registered
//         const findCompanyData = await this.companyDataRepository.findByCNPJ(cnpj)
//         if (!findCompanyData) throw new CustomError("Company data must be completed - Check CNPJ", 400)
        
        
//         //find company type
//         const findCompanyType = await this.companyTypeRepository.findByCNPJ(cnpj)
//         if (!findCompanyType) throw new CustomError("Company type must be registered first", 400)

//         //check if card is already registered
//         const checkDebitCard = await this.partnerCardRepository.findByCardIdAndCompanyTypeId(findDebitCard.id, findCompanyType.id)
//         if(checkDebitCard) throw new CustomError("Debit Card already registered", 409)
        

//         if(findCompanyType.type.endsWith('comercio')){
            
//             const partnerCards = await PartnerCardsEntity.create(data)
//             partnerCards.card_id = findDebitCard.id        
    
//             partnerCards.company_type_id = findCompanyType.id

//             const activatePartnerBusinessCard = await this.partnerCardRepository.save(partnerCards)
            
//             return activatePartnerBusinessCard

//         }
//         else{
//             const data = {
//                 card_id: findDebitCard.id,
//                 company_type_id: findCompanyType.id
//             }

            
//             const employerCards = await EmployerCardsEntity.create(data)

//             const activateEmployerDebitCard = await this.employerCardRepository.save(employerCards)

//             return activateEmployerDebitCard
            
//         }


//     }
// }