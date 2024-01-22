import { CustomError } from "../../../../../errors/custom.error"
import { CompanyUserEntity, CompanyUserProps } from "../../entities/company-user.entity"
import { ICompanyUserRepository } from "../../repositories/company-user.repository"
import { Permissions } from "@prisma/client"


export class CreateCompanyUserUseCase {
  constructor(
    private companyUserRepository: ICompanyUserRepository
  ) { }

  async execute(data: CompanyUserProps, business_document: string) {

    console.log({business_document})
    //find company User by email
    if (data.email) {
      if(!data.business_document) throw new CustomError("CNPJ is required", 403)

      //if email exists, it means that it's an admin being created
      data.is_admin = true
      const admin = await CompanyUserEntity.create(data)

      if(!admin.name) throw new CustomError("Full name is required", 400)
      if(!admin.function) throw new CustomError("Admin position is required", 400)

      //check if email already exists
      const companyUserByEmail = await this.companyUserRepository.findByEmail(data.email)
      if (companyUserByEmail) throw new CustomError("Email already registered", 400)

      //check if username already exists in present company
      const findUserByUserName = await this.companyUserRepository.findByUserNameAndDocumentAuth(data.user_name, data.business_document)
      if (findUserByUserName) throw new CustomError("Username already registered", 400)


      //create company admin
      const createCompanyAdmin = await this.companyUserRepository.saveUser(admin)

      return createCompanyAdmin

    }

    //if email is empty, it means that it's a secondary user being created
    const user = await CompanyUserEntity.create(data)

    //get company Admin with company_document(cnpj) and admin role
    const findCompanyAdmin = await this.companyUserRepository.findByCnpjAndAdminRole(business_document)
    if (!findCompanyAdmin) throw new CustomError("Unable to find company Admin", 400)

    console.log({findCompanyAdmin})
    //Before doing anything, admin must have document registered
    if(!findCompanyAdmin.admin_document) throw new CustomError("Admin must register CPF", 400)

    //check if username already exists among Admin users
    const findUser = await this.companyUserRepository.findByUserNameAndDocumentAuth(data.user_name, data.business_document)
    if(findUser) throw new CustomError("User already exists", 409)
    
    //check if admin is a client
    if(!findCompanyAdmin.is_client) throw new CustomError("User must have a contract first", 403)

    //check if is admin
    if(!findCompanyAdmin.is_admin) throw new CustomError("Only admin is allowed to create new users", 403)

    //if company is found, define value to seconday users 
    user.business_document = findCompanyAdmin.business_document
    user.is_client = findCompanyAdmin.is_client
    user.is_admin = false

  
    //By default, permissions is All - But should be only for admins.
    if(user.permissions.includes('all')) throw new CustomError("Please, select a permission type", 403) 

    //create user
    const createCompanyUser = await this.companyUserRepository.saveUser(user)

    return createCompanyUser






  }
}

