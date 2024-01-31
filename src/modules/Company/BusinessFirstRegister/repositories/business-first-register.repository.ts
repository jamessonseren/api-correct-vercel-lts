import { BusinessRegisterEntity } from "../entities/business-first-register.entity";

export interface IBusinessFirstRegisterRepository{
    save(data: BusinessRegisterEntity): Promise<void>
}