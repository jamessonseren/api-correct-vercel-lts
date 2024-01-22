import { CompanyUserEntity, CompanyUserProps } from "../entities/company-user.entity"
import { BusinessUserResponse } from "../companyUserDto/company-user.dto"

export interface ICompanyUserRepository{
    findByUsers(cnpj: string): Promise<CompanyUserEntity[] | null>
    findById(id: string): Promise<BusinessUserResponse | null>
    findByCnpjAndAdminRole(business_document: string): Promise<BusinessUserResponse | null>
    findByEmail(email: string): Promise<BusinessUserResponse | null>
    findByUserNameAndDocumentAuth(user_name: string, business_document: string): Promise<CompanyUserEntity | null>
    updateUser(data: CompanyUserProps): Promise<BusinessUserResponse>
    saveUser(data: CompanyUserEntity): Promise<BusinessUserResponse>
    deleteByAdminById(user_id: string): Promise<void>
}