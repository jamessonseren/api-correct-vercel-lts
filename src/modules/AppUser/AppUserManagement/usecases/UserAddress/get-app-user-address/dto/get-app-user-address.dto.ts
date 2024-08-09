import { Uuid } from "../../../../../../../@shared/ValueObjects/uuid.vo";

export interface InputGetUserAddressDTO {
    document: string
}

export interface OutputGetUserAddressDTO {
    uuid: Uuid
    line1: string | null;
    line2: string | null;
    line3: string | null;
    postal_code: string;
    neighborhood: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    created_at?: string;
    updated_at?: string;
}