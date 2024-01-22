import { CustomError } from "../../../../../errors/custom.error";
import { ICompanyDataRepository } from "../../../../Company/CompanyData/repositories/company-data.repository";
import { IAppUserRepository } from "../../../UserByCorrect/repositories/app-user-data-repostory";
import { AppUserByUserEntity, IAuthAppUserProps } from "../../entities/create-user-by-user/appuser-by-user.entity";
import { IAppUserAuthRepository } from "../../repositories/app-use-auth-repository";

export class CreateAppUserByUserUsecase {

    constructor(
        private appUserAuthRepository: IAppUserAuthRepository,
        private appUserDataRepository: IAppUserRepository,
        private businessInfoRepository: ICompanyDataRepository
    ) { }
    async execute(data: IAuthAppUserProps) {
        const appUser = await AppUserByUserEntity.create(data)

        //check if cpf is already registered
        const findAppUserByCPF = await this.appUserAuthRepository.findByCPF(data.document)
        if (findAppUserByCPF) throw new CustomError("User is already registered", 409)


        //check if email is already registered
        const findAppUserByEmail = await this.appUserAuthRepository.findByemail(data.email)
        if (findAppUserByEmail) throw new CustomError("Email is already registered", 409)

        //try to find user in database registers
        const employeeUser = await this.appUserDataRepository.findByCPF(data.document)
        if (employeeUser) {
            appUser.user_info_uuid = employeeUser.uuid
            //check if user is an employee - registered by correct admin
            if (employeeUser.business_info_uuid !== null) {
                //find business Info
                const businessInfo = await this.businessInfoRepository.findById(employeeUser.business_info_uuid)
                
                //if business info exists, it means that it's really a employe - this is a double confirmation
                if(businessInfo){
                    await this.appUserAuthRepository.saveRegisteredUser(appUser)
                    return {
                        success: "User created successfully",
                        employee: true,
                        company_owner: `${employeeUser.company_owner}`,
                        company_name: `${businessInfo.fantasy_name}`
                        
                    }
                }
            }
        }
        //if user is not found, it means that it's not an employee
        await this.appUserAuthRepository.saveRegisteredUser(appUser)
        return {
            success: "User created successfully",
            message: false
        }


    }
}