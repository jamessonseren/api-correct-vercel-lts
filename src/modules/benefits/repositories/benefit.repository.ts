import { BenefitsEntity } from '../entities/benefit.entity';
import { InputCreateBenefitDto } from '../usecases/create-benefit/create-benefit.dto';

export interface IBenefitsRepository {
    create(input: BenefitsEntity): Promise<void>;
    getByID(uuid: string): Promise<BenefitsEntity | null>;
    update(uuid: string, data: BenefitsEntity): Promise<void>;
    list(): Promise<BenefitsEntity[] | []>;
    // delete(uuid: string): Promise<void>;
}
