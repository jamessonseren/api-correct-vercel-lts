import { IPasswordCrypto } from "../../../../../crypto/password.crypto";
import { newDateF } from "../../../../../utils/date";
import { ICompanyUserRepository } from "../../../../Company/CompanyUser/repositories/company-user.repository";
import { ConfirmPasswordUsecase } from "../../../../Company/CompanyUser/usecases/confirm-password/confirm-password.usecase";
import { CompanyContractEntity, CompanyContractProps } from "../../entities/company-contract.entity";
import { ICompanyContractRepository } from "../../repositories/implementations/company-contract.repository";

export class CreateCompanyContractUsecase {
    constructor(
        private companyContractRepository: ICompanyContractRepository,
        private businessUser: ICompanyUserRepository,
        private passwordCrypto: IPasswordCrypto,

    ){}

    async execute(data: CompanyContractProps, adminId: string, password: string){

        data.assigned_at = newDateF()

        //validate password
        const comparePassword = new ConfirmPasswordUsecase(this.businessUser, this.passwordCrypto)
        await comparePassword.execute(adminId, password)
        
        const contract = await CompanyContractEntity.create(data)
        const createContract = await this.companyContractRepository.save(contract)

        return createContract
    }
}