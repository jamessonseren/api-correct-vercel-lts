// import { CustomError } from "../../../../../errors/custom.error";
// import { ICompanyDataRepository } from "../../../../Company/CompanyData/repositories/company-data.repository";
// import { ICards } from "../../../CardsByCorrect/repositories/cards-repository";
// import { EmployerCardsEntity } from "../../../EmployerCards/entities/employer-cards.entity";
// import { IEmployercardRepository } from "../../../EmployerCards/repositories/employer-card.repository";
// import { PartnerCardsEntity, PartnerCardsProps } from "../../../PartnerCards/entities/partner-cards.entity";
// import { IPartnerCardRepository } from "../../../PartnerCards/repositories/partner-card.repository";

// export class ActivateBusinessCardsByCorrectUsecase {
//     constructor(
//         private partnerCardRepository: IPartnerCardRepository,
//         private employerCardRepository: IEmployercardRepository,
//         private companyDataRepository: ICompanyDataRepository,
//         private cards: ICards


//     ) {}
//     async execute(data: PartnerCardsProps, cnpj: string) {

//         if(!cnpj) throw new CustomError("Company CNPJ is required", 401)

        
//         //find business card
//         const findBusinessCard = await this.cards.findByName("Conta Business")
//         if(!findBusinessCard) throw new CustomError("Can not find any account called 'Conta Business'", 400)
        
//         //check if company data is already registered
//         const findCompanyData = await this.companyDataRepository.findByCNPJ(cnpj)
//         if (!findCompanyData) throw new CustomError("Company data must be completed - Check CNPJ", 400)
        
        

//         //check if card is already registered
//         const checkBusinessCard = await this.partnerCardRepository.findByCardIdAndCompanyTypeId(findBusinessCard.id, findCompanyType.id)
//         if(checkBusinessCard) throw new CustomError("Business Card already registered", 409)
        

//         if(findCompanyType.type.endsWith('comercio')){
            
//             const partnerCards = await PartnerCardsEntity.create(data)
//             partnerCards.card_id = findBusinessCard.id        
    
//             partnerCards.company_type_id = findCompanyType.id

//             const activatePartnerBusinessCard = await this.partnerCardRepository.save(partnerCards)
            
//             return activatePartnerBusinessCard

//         }
//         else{
//             const data = {
//                 card_id: findBusinessCard.id,
//                 company_type_id: findCompanyType.id
//             }

            
//             const employerCards = await EmployerCardsEntity.create(data)

//             const activateEmployerBusinessCard = await this.employerCardRepository.save(employerCards)

//             return activateEmployerBusinessCard
            
//         }


//     }
// }