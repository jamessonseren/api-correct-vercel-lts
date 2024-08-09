import { UserDocumentValidationStatus } from "@prisma/client";
import { randomUUID } from 'crypto';
import { CustomError } from "../../../../errors/custom.error";
import validator from "validator";
import { newDateF } from "../../../../utils/date";
import { Uuid } from "../../../../@shared/ValueObjects/uuid.vo";

export type DocumentValidationProps = {
    uuid?: Uuid
    document_front_base64: string;
    document_front_status: UserDocumentValidationStatus;
    document_back_base64: string;
    document_back_status: UserDocumentValidationStatus;
    selfie_base64: string;
    selfie_status: UserDocumentValidationStatus;
    document_selfie_base64: string;
    document_selfie_status: UserDocumentValidationStatus;
    created_at?: string
    updated_at?: string
};

export class DocumentValidationEntity {
    private _uuid: Uuid;
    private _document_front_base64: string;
    private _document_front_status: UserDocumentValidationStatus;
    private _document_back_base64: string;
    private _document_back_status: UserDocumentValidationStatus;
    private _selfie_base64: string;
    private _selfie_status: UserDocumentValidationStatus;
    private _document_selfie_base64: string;
    private _document_selfie_status: UserDocumentValidationStatus;
    private _created_at?: string;
    private _updated_at?: string

    constructor(props: DocumentValidationProps) {
        this._uuid = props.uuid ?? new Uuid();
        this._document_front_base64 = props.document_front_base64;
        this._document_front_status = props.document_front_status;
        this._document_back_base64 = props.document_back_base64;
        this._document_back_status = props.document_back_status;
        this._selfie_base64 = props.selfie_base64;
        this._selfie_status = props.selfie_status;
        this._document_selfie_base64 = props.document_selfie_base64;
        this._document_selfie_status = props.document_selfie_status;
        this._created_at = newDateF(new Date())
        this._updated_at = newDateF(new Date())

        this.validate();
    }

    get uuid(): Uuid {
        return this._uuid;
    }

    get document_front_base64(): string {
        return this._document_front_base64;
    }

    get document_front_status(): UserDocumentValidationStatus {
        return this._document_front_status;
    }

    get document_back_base64(): string {
        return this._document_back_base64;
    }

    get document_back_status(): UserDocumentValidationStatus {
        return this._document_back_status;
    }

    get selfie_base64(): string | null {
        return this._selfie_base64;
    }

    get selfie_status(): UserDocumentValidationStatus {
        return this._selfie_status;
    }

    get document_selfie_base64(): string {
        return this._document_selfie_base64;
    }

    get document_selfie_status(): UserDocumentValidationStatus {
        return this._document_selfie_status;
    }
    get created_at(): string | undefined {
        return this._created_at;
    }

    get updated_at(): string | undefined {
        return this._updated_at
    }
    changeDocumentFrontBase64(base64: string) {
        this._document_front_base64 = base64;
        this.validate();
    }

    changeDocumentFrontStatus(status: UserDocumentValidationStatus) {
        this._document_front_status = status;
        this.validate();
    }

    changeDocumentBackBase64(base64: string) {
        this._document_back_base64 = base64;
        this.validate();
    }

    changeDocumentBackStatus(status: UserDocumentValidationStatus) {
        this._document_back_status = status;
        this.validate();
    }

    changeSelfieBase64(base64: string | null) {
        this._selfie_base64 = base64;
        this.validate();
    }

    changeSelfieStatus(status: UserDocumentValidationStatus) {
        this._selfie_status = status;
        this.validate();
    }

    changeDocumentSelfieBase64(base64: string) {
        this._document_selfie_base64 = base64;
        this.validate();
    }

    changeDocumentSelfieStatus(status: UserDocumentValidationStatus) {
        this._document_selfie_status = status;
        this.validate();
    }

    validate() {
        if (this._selfie_base64 && !validator.isBase64(this._selfie_base64)) {
            throw new CustomError("Invalid base64 format for 'selfie_base64'", 400);
        }

        if (this._document_front_base64 && !validator.isBase64(this._document_front_base64)) {
            throw new CustomError("Invalid base64 format for 'document_front_base64'", 400);
        }

        if (this._document_back_base64 && !validator.isBase64(this._document_back_base64)) {
            throw new CustomError("Invalid base64 format for 'document_back_base64'", 400);
        }

        if (this._document_selfie_base64 && !validator.isBase64(this._document_selfie_base64)) {
            throw new CustomError("Invalid base64 format for 'document_selfie_base64'", 400);
        }
    }

    static async create(data: DocumentValidationProps) {
        const documents = new DocumentValidationEntity(data);
        return documents;
    }
}