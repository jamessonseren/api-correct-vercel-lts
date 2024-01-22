import { CompanyDataEntity } from "../entities/company-data.entity";

export interface ICompanyDataRepository{
    saveOrUpdate(data: CompanyDataEntity): Promise<CompanyDataEntity>
    findByDocument(cnpj: string): Promise<CompanyDataEntity | null>
    findById(id: string): Promise<CompanyDataEntity | null>
    deleteById(cnpj: string):Promise<void>
}