import { CustomError } from "../../../../errors/custom.error"
import { CorrectAdminEntity } from "../../entities/correct-admin.entity"
import { ICorrectAdminRepository } from "../../repositories/correct-admin.repository"

export type CorrectAdminRequest = {
    name: string
    email: string
    userName: string
    password: string
    isAdmin: boolean
}

export class CreateCorrectAdminUseCase{
    constructor(
        private adminRepository: ICorrectAdminRepository
    ){}
    
    async execute(data: CorrectAdminRequest){
        const admin = await CorrectAdminEntity.create(data)

        const adminExists = await this.adminRepository.findByUserName(data.userName)

        if(adminExists) throw new CustomError("UserName already exists", 409, "ERROR")

        const createAdmin = await this.adminRepository.save(admin)

        return createAdmin
    }
}