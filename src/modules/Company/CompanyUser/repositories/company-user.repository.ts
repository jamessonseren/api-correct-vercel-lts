import { CompanyUserEntity, CompanyUserProps } from "../entities/company-user.entity"
import { BusinessUserResponse } from "../companyUserDto/company-user.dto"

export interface ICompanyUserRepository{
    findByUsers(cnpj: string): Promise<CompanyUserEntity[] | null>
    findById(id: string): Promise<BusinessUserResponse | null>
    findByBusinessIdAndEmail(id: string, email: string): Promise<CompanyUserEntity | null>
    findByBusinessIdAndUsername(id: string, user_name: string): Promise<CompanyUserEntity | null>
    findByEmail(email: string): Promise<CompanyUserEntity | null>
    updateUser(data: CompanyUserProps): Promise<BusinessUserResponse>
    saveUser(data: CompanyUserEntity): Promise<BusinessUserResponse>
    deleteByAdminById(user_id: string): Promise<void>
}