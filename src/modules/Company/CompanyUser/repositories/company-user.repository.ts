import { CompanyUserEntity, CompanyUserProps } from "../entities/company-user.entity"
import { BusinessUserResponse } from "../companyUserDto/company-user.dto"

export interface ICompanyUserRepository{
    findByUserNameAndDocumentAuth(user_name: string, document: string): Promise<CompanyUserEntity | null>
    findByUsers(cnpj: string): Promise<CompanyUserEntity[] | null>
    findById(id: string): Promise<BusinessUserResponse | null>
    findByEmail(email: string): Promise<CompanyUserEntity | null>
    updateUser(data: CompanyUserProps): Promise<BusinessUserResponse>
    saveUser(data: CompanyUserEntity): Promise<BusinessUserResponse>
    deleteByAdminById(user_id: string): Promise<void>
}