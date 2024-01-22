// import { prismaClient } from "../../../../../infra/databases/prisma.config";
// import { PartnerCardsEntity, PartnerCardsProps } from "../../entities/partner-cards.entity";
// import { IPartnerCardRepository } from "../partner-card.repository";

// export class PartnerCardPrismaRepository implements IPartnerCardRepository {
   
   

    
    

//     async save(data: PartnerCardsProps): Promise<PartnerCardsEntity> {
//         const partnerCard = await prismaClient.partnerCards.create({
//             data: {
//                 card_id: data.card_id,
//                 company_type_id: data.company_type_id,
//                 adm_correct_fee: data.adm_correct_fee,
//                 mkt_correct_fee: data.mkt_correct_fee,
//                 total_installments: data.total_installments,
//                 cashback: data.cashback
               
//             }
//         })

//         return partnerCard
//     }

//     async saveBusinessCard(data: PartnerCardsProps): Promise<PartnerCardsEntity> {
//         const businessCard = await prismaClient.partnerCards.create({
//             data: {
//                 card_id: data.card_id,
//                 company_type_id: data.company_type_id,
//                 adm_correct_fee: data.adm_correct_fee,
//                 mkt_correct_fee: data.mkt_correct_fee,
//                 total_installments: data.total_installments,
//                 cashback: data.cashback
               
//             }
//         })

//         return businessCard
//     }


// }