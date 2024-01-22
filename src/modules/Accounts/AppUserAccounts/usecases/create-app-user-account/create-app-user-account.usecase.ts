// import { CustomError } from "../../../../../errors/custom.error";
// import { IAppUserAuthRepository } from "../../../../AppUser/AppUserManagement/repositories/app-use-auth-repository";
// import { IAppUserRepository } from "../../../../AppUser/UserByCorrect/repositories/app-user-data-repostory";
// import { ICards } from "../../../../Cards/CardsByCorrect/repositories/cards-repository";
// import { IEmployercardRepository } from "../../../../Cards/EmployerCards/repositories/employer-card.repository";
// import { ICompanyTypeRepository } from "../../../../Company/CompanyType/repositories/company-type.repository";
// import { AppUserAccountsEntity, AppUserAccountsProps } from "../../entities/appUserAccounts.entity";
// import { IAppUserAccountRepository } from "../../repositories/app-user-account.repository";
// import { CreateAppUserOwnerAccountUsecase } from "../create-app-user-owner-account/create-app-user-owner.account";

// export class CreateAppUserAccountUsecase {
//     constructor(
//         private appUserAuthRepository: IAppUserAuthRepository,
//         private cardsRepository: ICards,
//         private appUserAccountRepository: IAppUserAccountRepository,
//         private employerCardsRepository: IEmployercardRepository,
//         private appUserDataRepository: IAppUserRepository,
//         private companyTypeRepository: ICompanyTypeRepository
//     ) { }

//     async execute(data: AppUserAccountsProps) {
//         const appUserAccount = await AppUserAccountsEntity.create(data)

//         //find user details
//         const userDetails = await this.appUserAuthRepository.findById(data.app_user_id)
//         if (!userDetails) throw new CustomError("Unable to find App User Details - Check User Id", 401)

//         //check if user already has data registered
//         const findUserData = await this.appUserDataRepository.findByCPF(userDetails.cpf)
//         if(!findUserData) throw new CustomError("App User must complete data before activating accounts", 400)

//         //check if user has some company associated - if app_user_data_id is null, it means that no company is associated and it is an independent appuser
//         if (findUserData.employee === false) {
//             appUserAccount.available_amount = 0
//             //find debit card Id
//             const debitCard = await this.cardsRepository.findByName('Debito')
//             if (!debitCard) throw new CustomError("Unable to find Debit Card", 400)
            
//             //check if user already has debit card
//             appUserAccount.card_id = debitCard.id
//             const findUserDebitCard = await this.appUserAccountRepository.findByUserIdAndCardId(data.app_user_id, appUserAccount.card_id)

//             if(findUserDebitCard) throw new CustomError("User already has Debit Card Registered", 409)
        
//             //create only debit card for independent user
//             const createCard = await this.appUserAccountRepository.save(appUserAccount)
//             return createCard
            
//         } else {
//             //if there is a company associated, check if this appuser is the company owner
//             if (findUserData.company_owner === true) {

//                 const companyOwnerAccount = new CreateAppUserOwnerAccountUsecase(
//                     this.employerCardsRepository,
//                     this.appUserAccountRepository
//                 )
                
//                 return await companyOwnerAccount.execute(findUserData.company_type_id, appUserAccount, data.app_user_id)

//             }

//             //AppUser is not company owner
//             //find available cards for this app user
//             const findAvailableCards = await this.employerCardsRepository.findByCompanyType(findUserData.company_type_id)
//             if (!findAvailableCards) throw new CustomError("Unable to find available cards - Please check company type ID.", 401)

//             //create arrays to save data in memory
//             const newCardsActivated = []
//             const cardsAlreadyRegistered = []

//             for (const employerCard of findAvailableCards) {
//                 //check if user already has card
//                 const findUserCards = await this.appUserAccountRepository.findByAppUserAndEmployerCardId(data.app_user_id, employerCard.id)

//                 //do not let business account   to be created if user is not company owner
//                 if(employerCard.Cards.card_name === 'Conta Business') continue

//                 if (!findUserCards) {
//                     // console.log({employerCard})
//                    appUserAccount.available_amount = 0
//                    appUserAccount.employer_cards_id = employerCard.id
//                    appUserAccount.card_id = employerCard.card_id
//                    appUserAccount.status = true

//                 //    console.log({appUserAccount})
                   
                   
//                    //if user does not have available card registered, create a new one
//                     const newCard = await this.appUserAccountRepository.save(appUserAccount)
                   

//                     //add new cards to newCardsActivated array - easly displayed to frontend
//                     newCardsActivated.push(newCard.Cards.card_name)

//                 }else{

//                     if(findUserCards.EmployerCards === null) continue
//                     //if user already has card, add to cardsAlreadyRegistered array
//                     cardsAlreadyRegistered.push(findUserCards.Cards.card_name)

//                 }

//             }

//             return {
//                 cardsAlreadyRegistered,
//                 newCardsActivated
//             }

//         }
//     }
// }