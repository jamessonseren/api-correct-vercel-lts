import { Uuid } from "../../../../@shared/ValueObjects/uuid.vo"
import { CustomError } from "../../../../errors/custom.error"
import { ICorrectAdminRepository } from "../../repositories/correct-admin.repository"

export class FindCorrectAdminUsecase {
  constructor(
    private correctAdminRepository: ICorrectAdminRepository
  ) { }

  async execute(id: Uuid) {
    const correctAdmin = await this.correctAdminRepository.find(id)

    if (!correctAdmin) throw new CustomError("Unauthorized", 401)

    return {
      uuid: correctAdmin.uuid.uuid,
      name: correctAdmin.name,
      email: correctAdmin.email,
      userName: correctAdmin.userName,
      isAdmin: correctAdmin.isAdmin
    }
  }
}
