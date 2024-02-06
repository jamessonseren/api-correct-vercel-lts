import { randomUUID } from 'crypto';
import { CustomError } from '../../../errors/custom.error';
import { BenefitType } from '@prisma/client';

export type BenefitsProps = {
    uuid: string;
    benefit_name: string;
    benefit_type: BenefitType;
    created_at: string;
    updated_at: string;
};

export class BenefitsEntity {
    uuid: string;
    benefit_name: string;
    benefit_type: BenefitType;
    created_at: string;
    updated_at: string;

    private constructor(props: BenefitsProps) {
        this.uuid = props.uuid ? props.uuid : randomUUID();
        this.benefit_name = props.benefit_name;
        this.benefit_type = props.benefit_type;
        this.created_at = props.created_at;
        this.updated_at = props.updated_at;
    }

    static create(data: BenefitsProps) {
        if (!data.benefit_name)
            throw new CustomError('Benefit name is required', 400);
        if (!data.benefit_type || !BenefitType[data.benefit_type])
            throw new CustomError('Invalid benefit type is required', 400);

        const benefit = new BenefitsEntity(data);
        return benefit;
    }
}
