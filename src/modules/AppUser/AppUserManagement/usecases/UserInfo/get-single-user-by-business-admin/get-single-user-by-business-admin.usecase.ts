import { CustomError } from "../../../../../../errors/custom.error";
import { ICompanyUserRepository } from "../../../../../Company/CompanyUser/repositories/company-user.repository";
import { IAppUserInfoRepository } from "../../../repositories/app-user-info.repository";

export class GetSingleUserByBusinessAdminUsecase {
    constructor(
        private appUsersRepository: IAppUserInfoRepository,
        private businessUserRepository: ICompanyUserRepository

    ) { }

    async execute(employee_uuid: string, business_user_uuid: string) {

        if (!employee_uuid) throw new CustomError("Employee uuid is requred", 400)
        if (!business_user_uuid) throw new CustomError("Business user uuid is required", 400)

        const [employee, business_user] = await Promise.all([
            this.appUsersRepository.findById(employee_uuid),
            this.businessUserRepository.findById(business_user_uuid)
        ])

        if (!employee) throw new CustomError("Employee not found", 404)

        if (business_user?.business_info_uuid !== employee.business_info_uuid) throw new CustomError("Unauthorized access", 401)


        return employee
    }
}