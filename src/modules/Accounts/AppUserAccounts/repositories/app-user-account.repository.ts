import { AppUserAccountsEntity } from "../entities/appUserAccounts.entity";

export type AppUserAccountsResponse = {
    id: string
    card_id: string
    account_number: string
    available_amount: number
    employer_cards_id: string | null
    app_user_id: string
    status: boolean,
    AppUserAuth: {
        id: string;
        cpf: string;
        email: string;
        authenticated: boolean;
    },
    Cards:{
        id: string,
        card_name: string,
        card_type: string
    },
    EmployerCards: {
        id: string;
       business_data_id: string
    } | null
}
export interface IAppUserAccountRepository{
    findById(id: string): Promise<AppUserAccountsEntity | null>
    findByAccountNumber(id: string): Promise<AppUserAccountsEntity | null>
    findByEmployerCardsId(id: string): Promise<AppUserAccountsResponse | null>
    findByAppUserAndEmployerCardId(user_id: string, employer_card_id: string): Promise<AppUserAccountsResponse | null>
    findByAppUserId(id: string): Promise<AppUserAccountsResponse | null>
    findByUserIdAndCardId(user_id: string, cardId: string): Promise<AppUserAccountsResponse | null>
    save(data: AppUserAccountsEntity): Promise<AppUserAccountsResponse>
}