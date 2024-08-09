import { randomUUID } from 'crypto';
import { CustomError } from '../../../errors/custom.error';

export type BranchProps = {
    uuid: string;
    name: string;
    benefits_uuid: string[];
    marketing_tax: number;
    admin_tax: number;
    market_place_tax: number;
    created_at: string;
    updated_at: string;
};

export class BranchEntity {
    uuid: string;
    name: string;
    benefits_uuid: string[];
    marketing_tax: number;
    admin_tax: number;
    market_place_tax: number;
    created_at: string;
    updated_at: string;

    private constructor(props: BranchProps) {
        this.uuid = props.uuid ? props.uuid : randomUUID();
        this.name = props.name;
        this.benefits_uuid = props.benefits_uuid;
        this.marketing_tax = props.marketing_tax;
        this.admin_tax = props.admin_tax;
        this.market_place_tax = props.market_place_tax
        this.created_at = props.created_at;
        this.updated_at = props.updated_at;
        this.validate()
    }

    validate(){
        if (!this.name) throw new CustomError('Branch name is required', 400);
        if (!this.benefits_uuid || this.benefits_uuid.length === 0)
            throw new CustomError(
                'Invalid benefits group. One or more benefits is required',
                400
            );

    }
    static create(data: BranchProps) {

        const branch = new BranchEntity(data);
        return branch;
    }
}
