import { BenefitsEntity } from '../entities/benefit.entity';

export interface IBenefitsRepository {
    create(data: BenefitsEntity): Promise<BenefitsEntity>;
    getByID(uuid: string): Promise<BenefitsEntity | null>;
    update(uuid: string, data: BenefitsEntity): Promise<void>;
    list(): Promise<BenefitsEntity[] | []>;
    // delete(uuid: string): Promise<void>;
}
