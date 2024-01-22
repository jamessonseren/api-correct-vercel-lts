// import { CustomError } from "../../../../../errors/custom.error";
// import { IAppUserRepository } from "../../../../AppUser/UserByCorrect/repositories/app-user-data-repostory";
// import { IEmployercardRepository } from "../../../../Cards/EmployerCards/repositories/employer-card.repository";
// import { ICompanyTypeRepository } from "../../../../Company/CompanyType/repositories/company-type.repository";
// import { AppUserAccountsEntity, AppUserAccountsProps } from "../../entities/appUserAccounts.entity";
// import { IAppUserAccountRepository } from "../../repositories/app-user-account.repository";

// export class CreateAppUserOwnerAccountUsecase {
//     constructor(
//         private employerCardsRepository: IEmployercardRepository,
//         private appUserAccountRepository: IAppUserAccountRepository
//     ) { }

//     async execute(companyTypeId: string | null, appUserAccount: AppUserAccountsEntity, app_user_id: string) {

//         //if there is no company type ID, it means that there was some mistake in another module
//         if (!companyTypeId) return

//         //check all available cards for this appuser
//         const findAvailableCards = await this.employerCardsRepository.findByCompanyType(companyTypeId)
//         if (!findAvailableCards) throw new CustomError("Unable to find available cards - Please check company type ID.", 401)

//         //create arrays to save appUser info
//         const newCardsActivated = []
//         const cardsAlreadyRegistered = []

//         for (const companyCards of findAvailableCards) {

//             //check if user already has card
//             const findUserCards = await this.appUserAccountRepository.findByAppUserAndEmployerCardId(app_user_id, companyCards.id)


//             //If cards is still no registered, save new card and add to array
//             if (!findUserCards) {
//                 appUserAccount.available_amount = 0
//                 appUserAccount.employer_cards_id = companyCards.id
//                 appUserAccount.card_id = companyCards.card_id
                
//                 console.log({ appUserAccount })
//                 const newCard = await this.appUserAccountRepository.save(appUserAccount)

//                 if (newCard.EmployerCards === null) continue
//                 //add new cards to newCardsActivated array
//                 newCardsActivated.push(newCard.Cards.card_name)
//             } else {

//                 if (findUserCards.EmployerCards === null) continue

//                 //if it is already registered, add to array
//                 cardsAlreadyRegistered.push(findUserCards.Cards.card_name)
//             }


//         }

//         return {
//             cardsAlreadyRegistered,
//             newCardsActivated
//         }


//     }
// }