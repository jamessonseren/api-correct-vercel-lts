export type AppUserRequest = {
    document: string,
    document2: string | null,
    display_name: string | null,
    internal_company_code: string | null,
    gender: string | null,
    date_of_birth: Date,
    salary: string | null,
    company_owner: boolean
    user_function: string | null
    marital_status: string | null,
    dependents_quantity: number
}