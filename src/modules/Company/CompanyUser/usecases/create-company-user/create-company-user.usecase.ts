import { CustomError } from "../../../../../errors/custom.error"
import { ICompanyDataRepository } from "../../../CompanyData/repositories/company-data.repository"
import { CompanyUserEntity, CompanyUserProps } from "../../entities/company-user.entity"
import { ICompanyUserRepository } from "../../repositories/company-user.repository"


export class CreateCompanyByCorrectUserUseCase {
  constructor(
    private companyUserRepository: ICompanyUserRepository,
    private companyDataRepository: ICompanyDataRepository
  ) { }

  async execute(data: CompanyUserProps) {

    if (!data.email) throw new CustomError("Email is required", 400)

    //if email exists, it means that it's an admin being created  Correct
    data.is_admin = true

    //check if email is already registered in business info database
    const findByEmail = await this.companyDataRepository.findByEmail(data.email)
    if (!findByEmail) throw new CustomError("Email not found in company registers", 400)

    //if business info exists, relate to current user
    data.business_info_uuid = findByEmail.uuid
    data.business_document = findByEmail.document
    data.status === 'pending_password'
    
    const admin = await CompanyUserEntity.create(data)

    //if(!admin.name) throw new CustomError("Full name is required", 400)
    // if(!admin.function) throw new CustomError("Admin position is required", 400)

    //check if email already exists in users registers
    const companyUserByEmail = await this.companyUserRepository.findByEmail(data.email)
    if (companyUserByEmail) throw new CustomError("Email already registered", 400)

    //create company admin
    const createCompanyAdmin = await this.companyUserRepository.saveUser(admin)

    return createCompanyAdmin
  }
}

