import { CustomError } from "../../../../../errors/custom.error";
import { ICompanyDataRepository } from "../../../CompanyData/repositories/company-data.repository";
import { BusinessRegisterEntity, BusinessRegisterProps } from "../../entities/business-first-register.entity";
import { IBusinessFirstRegisterRepository } from "../../repositories/business-first-register.repository";

export class CreateBusinessRegisterUsecase {
    constructor(
        private businessRegisterRepository: IBusinessFirstRegisterRepository,
        private companyDataRepository: ICompanyDataRepository
    ){}

    async execute(data: BusinessRegisterProps){
        const findBusiness = await this.companyDataRepository.findByDocument(data.document)
        
        const register = await BusinessRegisterEntity.create(data)
        if(findBusiness) throw new CustomError("Business already registered", 409)

        const createFirstRegister = await this.businessRegisterRepository.save(register)

        return createFirstRegister
    }
}