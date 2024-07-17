import { BusinessContract } from "@prisma/client";
import { prismaClient } from "../../../../../../infra/databases/prisma.config";
import { BusinessContractResponse, ContractsInfoResponse } from "../../../../contracts-dto/contracts.dto";
import { CompanyContractEntity } from "../../../entities/company-contract.entity";
import { ICompanyContractRepository } from "../company-contract.repository";

export class CompanyContractPrismaRepository implements ICompanyContractRepository {
    findById(uuid: string): Promise<ContractsInfoResponse | null> {
        throw new Error("Method not implemented.");
    }
    findManyByBusinessId(business_info_uuid: string): Promise<BusinessContract[] | null> {
        throw new Error("Method not implemented.");
    }
    save(data: CompanyContractEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    // async findById(uuid: string): Promise<ContractsInfoResponse | null> {
    //     const contract = await prismaClient.contractInfo.findUnique({
    //         where: {
    //             uuid
    //         }
    //     })
        
    //     return contract
    // }
    
    // async findManyByBusinessId(business_info_uuid: string): Promise<BusinessContractResponse[] | null> {
    //     const contracts = await prismaClient.businessContract.findMany({
    //         where:{
    //             business_info_uuid
    //         },
    //         include:{
    //             ContractInfo:{
    //                 select:{
    //                     name: true,
    //                     content: true
    //                 }
    //             }
    //         }
    //     })

    //     return contracts
    // }
   

    // async save(data: CompanyContractEntity): Promise<void> {

    //     const [contract, businessContract, businessInfo] = await prismaClient.$transaction([
    //         prismaClient.contractInfo.create({
    //             data: {
    //                 uuid: data.contract_uuid,
    //                 assigned_at: data.assigned_at,
    //                 content: data.content,
    //                 name: data.name,
    //                 version: data.version
                    
    //             }
    //         }),

    //         prismaClient.businessContract.create({
                
    //             data:{
    //                 uuid: data.business_contract_uuid,
    //                 business_info_uuid: data.business_info_uuid,
    //                 contract_info_uuid: data.contract_uuid
    //             }
    //         }),

    //         prismaClient.businessInfo.update({
    //             where:{
    //                 uuid: data.business_info_uuid
    //             },
    //             data:{
    //                 status:'active'
    //             }
    //         })

    //     ])


    // }

}