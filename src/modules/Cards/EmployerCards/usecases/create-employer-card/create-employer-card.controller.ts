// import { Request, Response } from "express";
// import { ICompanyDataRepository } from "../../../../Company/CompanyData/repositories/company-data.repository";
// import { ICompanyTypeRepository } from "../../../../Company/CompanyType/repositories/company-type.repository";
// import { IEmployercardRepository } from "../../repositories/employer-card.repository";
// import { EmployerCardsProps } from "../../entities/employer-cards.entity";
// import { CreateEmployerCardUsecase } from "./create-employer-card.usecase";

// export class CreateEmployerCardController{
//     constructor(
//         private employerCardRepository: IEmployercardRepository,
//         private companyTypeRepository: ICompanyTypeRepository,
//         private companyDataRepository: ICompanyDataRepository

//     ){}
    
//     async handle(req: Request, res: Response){
//         try{
//             const data: EmployerCardsProps = req.body

//             data.card_id = req.query.cardId as string

//             const company_admin_id = req.companyUserId

//             const employerCardUsecase = new CreateEmployerCardUsecase(
//                 this.employerCardRepository,
//                 this.companyTypeRepository,
//                 this.companyDataRepository
//             )

//             const employerCard = await employerCardUsecase.execute(data, company_admin_id)

//             return res.json(employerCard)
            
//         }catch(err: any){
//             return res.status(err.statusCode).json({
//                 error: err.message
//             })
//         }
//     }
// }