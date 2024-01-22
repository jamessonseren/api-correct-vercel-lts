// import { prismaClient } from "../../../../../infra/databases/prisma.config";
// import { AppUserAccountsEntity } from "../../entities/appUserAccounts.entity";
// import { AppUserAccountsResponse, IAppUserAccountRepository } from "../app-user-account.repository";

// export class AppUserAccountPrismaRepository implements IAppUserAccountRepository{
    
//     async findById(id: string): Promise<AppUserAccountsEntity | null> {
//         const userAccount = await prismaClient.appUserAccounts.findUnique({
//             where:{
//                 id
//             },
//             include:{
//                 AppUserAuth: true,
//                 EmployerCards: true
//             }
//         })

//         return userAccount
//     }
//     async findByAccountNumber(id: string): Promise<AppUserAccountsEntity | null> {
//         const userAccount = await prismaClient.appUserAccounts.findUnique({
//             where:{
//                 id
//             },
//             include:{
//                 AppUserAuth: {
//                     select:{
//                         id: true,
//                         document: true,
//                         email: true,
//                         authenticated: true
//                     }
//                 },
//                 EmployerCards: {
//                     include:{
//                         Cards: true
//                     }
//                 }
//             }
//         })

//         return userAccount
//     }
//     async findByEmployerCardsId(id: string): Promise<AppUserAccountsResponse | null> {
//         const userAccount = await prismaClient.appUserAccounts.findFirst({
//             where:{
//                 employer_cards_id: id
//             },
//             include:{
//                 AppUserAuth: {
//                     select:{
//                         id: true,
//                         document: true,
//                         email: true,
//                         authenticated: true
//                     }
//                 },
//                 Cards:{
//                     select:{
//                         id: true,
//                         card_name: true,
//                         card_type: true
//                     }
//                 },
//                 EmployerCards: {
//                     select:{
//                         id: true,
//                         business_data_id: true
//                     }
//                 }
//             }
//         })

//         return userAccount
//     }
//     async findByAppUserId(id: string): Promise<AppUserAccountsResponse | null> {
//         const userAccount = await prismaClient.appUserAccounts.findFirst({
//             where:{
//                 app_user_id: id
//             }, 
//             include:{
//                 AppUserAuth: {
//                     select:{
//                         id: true,
//                         document: true,
//                         email: true,
//                         authenticated: true
//                     }
//                 },
//                 Cards:{
//                     select:{
//                         id: true,
//                         card_name: true,
//                         card_type: true
//                     }
//                 },
//                 EmployerCards: {
//                     select:{
//                         id: true,
//                         business_data_id: true
//                     }
//                 }
//             }
//         })

//         return userAccount
//     }
//     async findByAppUserAndEmployerCardId(user_id: string, employer_card_id: string): Promise<AppUserAccountsResponse | null> {
//         const userAccount = await prismaClient.appUserAccounts.findFirst({
//             where:{
//                 app_user_id: user_id,
//                 employer_cards_id: employer_card_id
                
//             },
//             include:{
//                 AppUserAuth: {
//                     select:{
//                         id: true,
//                         document: true,
//                         email: true,
//                         authenticated: true
//                     }
//                 },
//                 Cards:{
//                     select:{
//                         id: true,
//                         card_name: true,
//                         card_type: true
//                     }
//                 },
//                 EmployerCards: {
//                     select:{
//                         id: true,
//                         business_data_id: true
//                     }
//                 }
//             }
//         })

//         return userAccount
//     }

//     async findByUserIdAndCardId(user_id: string, cardId: string): Promise<AppUserAccountsResponse | null> {
//         const userAccount = await prismaClient.appUserAccounts.findFirst({
//             where:{
//                 app_user_id: user_id,
//                 card_id: cardId
                
//             },
//             include:{
//                 AppUserAuth: {
//                     select:{
//                         id: true,
//                         document: true,
//                         email: true,
//                         authenticated: true
//                     }
//                 },
//                 Cards:{
//                     select:{
//                         id: true,
//                         card_name: true,
//                         card_type: true
//                     }
//                 },
//                 EmployerCards: {
//                     select:{
//                         id: true,
//                         business_data_id: true
//                     }
//                 }
//             }
//         })

//         return userAccount
//     }
//     async save(data: AppUserAccountsEntity): Promise<AppUserAccountsResponse> {
//         const userAccount = await prismaClient.appUserAccounts.create({
//             data:{
//                 card_id: data.card_id,      
//                 available_amount: data.available_amount,
//                 employer_cards_id: data.employer_cards_id,
//                 app_user_id: data.app_user_id,
//                 status: data.status
//             },
//             include:{
//                 AppUserAuth: {
//                     select:{
//                         id: true,
//                         document: true,
//                         email: true,
//                         authenticated: true
//                     }
//                 },
//                 Cards:{
//                     select:{
//                         id: true,
//                         card_name: true,
//                         card_type: true
//                     }
//                 },
//                 EmployerCards: {
//                     select:{
//                         id: true,
//                         business_data_id: true
//                     }
//                 }
//             }
//         })
        
//         return userAccount
//     }

// }