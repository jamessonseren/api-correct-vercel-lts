import { Uuid } from "../../../../@shared/ValueObjects/uuid.vo";
import { CustomError } from "../../../../errors/custom.error";
import { ICorrectAdminRepository } from "../../../../modules/CorrectAdmin/repositories/correct-admin.repository";

export class EnsureValidCorrectAdminUsecase {
    constructor(
        private correctAdminRepository: ICorrectAdminRepository
    ){}

    async execute(id: Uuid){
        const correctAdmin = await this.correctAdminRepository.find(id)

        if(!correctAdmin) throw new CustomError("Admin is not allowed to access", 401)

       return correctAdmin.uuid.uuid
    }
}