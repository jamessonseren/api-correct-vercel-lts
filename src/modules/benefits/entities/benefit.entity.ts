import { randomUUID } from 'crypto';
import { CustomError } from '../../../errors/custom.error';
import { ItemType, ItemCategory } from '../usecases/create-benefit/create-benefit.dto';

export type BenefitsProps = {
    name: string;
    description: string;
    item_type: ItemType;
    item_category: ItemCategory;
};

export class BenefitsEntity {
    private _uuid: string;
    private _name: string;
    private _description: string;
    private _item_type: ItemType;
    private _item_category: ItemCategory;

    constructor(props: BenefitsProps) {
        this._uuid = randomUUID();
        this._name = props.name;
        this._description = props.description;
        this._item_type = props.item_type;
        this._item_category = props.item_category;
        this.validate();
    }

    validate() {
        if (!this._name) throw new CustomError('Name is required', 400);
        if (!this._description) throw new CustomError('Description is required', 400);
        if (!this._item_type) throw new CustomError('Item type is required', 400);
        if (!this._item_category) throw new CustomError('Item category is required', 400);
    }

    get uuid(): string {
        return this._uuid;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get item_type(): ItemType {
        return this._item_type;
    }

    get item_category(): ItemCategory {
        return this._item_category;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeDescription(description: string) {
        this._description = description;
        this.validate();
    }

    changeItemType(item_type: ItemType) {
        this._item_type = item_type;
        this.validate();
    }

    changeItemCategory(item_category: ItemCategory) {
        this._item_category = item_category;
        this.validate();
    }

    
}