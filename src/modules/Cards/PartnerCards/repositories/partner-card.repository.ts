import { PartnerCardsEntity, PartnerCardsProps } from "../entities/partner-cards.entity";

export interface IPartnerCardRepository{
    findByCardIdAndCompanyTypeId(id: string, company_type: string): Promise<PartnerCardsEntity | null>
    save(data: PartnerCardsProps): Promise<PartnerCardsEntity>
    saveBusinessCard(data: PartnerCardsProps): Promise<PartnerCardsEntity>
}