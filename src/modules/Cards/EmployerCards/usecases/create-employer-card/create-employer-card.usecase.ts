// import { CustomError } from "../../../../../errors/custom.error";
// import { ICompanyDataRepository } from "../../../../Company/CompanyData/repositories/company-data.repository";
// import { EmployerCardsEntity, EmployerCardsProps } from "../../entities/employer-cards.entity";
// import { IEmployercardRepository } from "../../repositories/employer-card.repository";

// export class CreateEmployerCardUsecase{
//     constructor(
//         private employerCardRepository: IEmployercardRepository,
//         private companyDataRepository: ICompanyDataRepository
//     ){

//     }

//     async execute(data: EmployerCardsProps, companyAdminId: string){

//         const employerCard = await EmployerCardsEntity.create(data)

//         //check if company data is already registered
//         const findCompanyData = await this.companyDataRepository.findByCompanyAdmin(companyAdminId)
//         if(!findCompanyData) throw new CustomError("Company data must be completed", 400)
        

//         //check if card is already hired
//         const findBycardId = await this.employerCardRepository.findByCardIdAndCompanyTypeId(data.card_id, findCompanyType.id)
//         if (findBycardId) throw new CustomError("Card is already hired", 409)


//         //create new card
//         const hireCard = await this.employerCardRepository.save(employerCard)

//         return hireCard

//     }
// }