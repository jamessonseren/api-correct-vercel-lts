// import { Request, Response } from "express";
// import { IAppUserAuthRepository } from "../../../../AppUser/AppUserManagement/repositories/app-use-auth-repository";
// import { ICards } from "../../../../Cards/CardsByCorrect/repositories/cards-repository";
// import { IAppUserAccountRepository } from "../../repositories/app-user-account.repository";
// import { IEmployercardRepository } from "../../../../Cards/EmployerCards/repositories/employer-card.repository";
// import { AppUserAccountsProps } from "../../entities/appUserAccounts.entity";
// import { CreateAppUserAccountUsecase } from "./create-app-user-account.usecase";
// import { IAppUserRepository } from "../../../../AppUser/UserByCorrect/repositories/app-user-data-repostory";
// import { ICompanyTypeRepository } from "../../../../Company/CompanyType/repositories/company-type.repository";


// export class CreateAppUserAccountController{

//     constructor(
//         private appUserAuthRepository: IAppUserAuthRepository,
//         private cardsRepository: ICards,
//         private appUserAccountRepository: IAppUserAccountRepository,
//         private employerCardsRepository: IEmployercardRepository,
//         private appUserDataRepository: IAppUserRepository,
//         private companyTypeRepository: ICompanyTypeRepository


//     ){}

//     async handle(req: Request, res: Response){
        
//         try{

//             const data: AppUserAccountsProps = req.body

//             data.app_user_id = req.appUserId

//             const userAccountsUsecase = new CreateAppUserAccountUsecase(
//                 this.appUserAuthRepository,
//                 this.cardsRepository,
//                 this.appUserAccountRepository,
//                 this.employerCardsRepository,
//                 this.appUserDataRepository,
//                 this.companyTypeRepository
                
//             )

//                 const userAccounts = await userAccountsUsecase.execute(data)

//                 return res.json(userAccounts)

//         }catch(err: any){
//             return res.status(err.statusCode).json({
//                 error: err.message
//             })
//         }
//     }
// }