import { CompanyAddressEntity } from "../entities/company-address.entity";


export interface ICompanyAddressRepository{
    save(data: CompanyAddressEntity): Promise<CompanyAddressEntity>
    findById(id: string): Promise<CompanyAddressEntity | null>
}