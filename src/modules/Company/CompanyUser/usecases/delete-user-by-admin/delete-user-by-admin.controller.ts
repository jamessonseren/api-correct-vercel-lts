import { Request, Response } from "express";
import { ICompanyUserRepository } from "../../repositories/company-user.repository";
import { DeleteUserByAdminUsecase } from "./delete-user-by-admin.usecase";

export class DeleteUserByAdminController{
    constructor(
        private companyUserRepository: ICompanyUserRepository
    ){}
    async handle(req: Request, res: Response){

        const user_id = req.body.user_id as string

        const deleteUsecase = new DeleteUserByAdminUsecase(this.companyUserRepository)

        const deleteUser = await deleteUsecase.execute(user_id)

        return res.json(deleteUser)

        return res.json({message: "Usuário excluído com sucesso"})
    }
}