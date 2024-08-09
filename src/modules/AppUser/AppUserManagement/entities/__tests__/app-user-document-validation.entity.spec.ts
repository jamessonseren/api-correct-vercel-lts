import { DocumentValidationEntity, DocumentValidationProps } from '../app-user-document-validation.entity'
import { UserDocumentValidationStatus } from "@prisma/client";

describe("Unit Test DocumentValidationEntity", () => {
    it("Should throw an error if document_front_base64 is not valid base64", () => {
        const input: DocumentValidationProps = {
            selfie_base64: 'invalid_base64',
            document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send
        };

        expect(() => {
            new DocumentValidationEntity(input);
        }).toThrow("Invalid base64 format for 'selfie_base64'");
    });

    it("Should throw an error if document_back_base64 is not valid base64", () => {
        const input: DocumentValidationProps = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: 'invalid_base64',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send
        };

        expect(() => {
            new DocumentValidationEntity(input);
        }).toThrow("Invalid base64 format for 'document_front_base64'");
    });

    it("Should throw an error if selfie_base64 is not valid base64", () => {
         const input: DocumentValidationProps = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_back_base64: 'invalid_base64',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send
        };

        expect(() => {
            new DocumentValidationEntity(input);
        }).toThrow("Invalid base64 format for 'document_back_base64'");
    });

    it("Should throw an error if document_selfie_base64 is not valid base64", () => {
         const input: DocumentValidationProps = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'invalid_base64',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send
        };

        expect(() => {
            new DocumentValidationEntity(input);
        }).toThrow("Invalid base64 format for 'document_selfie_base64'");
    });

    it("Should create a DocumentValidationEntity", async () => {
         const input: DocumentValidationProps = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send
        };

        const documentValidation = await DocumentValidationEntity.create(input);

        expect(documentValidation).toHaveProperty('uuid');
        expect(documentValidation.document_front_base64).toEqual(input.document_front_base64);
        expect(documentValidation.document_back_base64).toEqual(input.document_back_base64)
        expect(documentValidation.document_selfie_base64).toEqual(input.document_selfie_base64)
        // expect(documentValidation.document_front_status).toEqual("pending_to_send")
        // expect(documentValidation.document_back_status).toEqual(input.document_back_status)
        // expect(documentValidation.document_back_base64).toEqual(input.document_back_base64)
        // expect(documentValidation.document_back_base64).toEqual(input.document_back_base64)


    });

    it("Should change document_front_base64", async () => {
         const input: DocumentValidationProps = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send
        };

        const documentValidation = new DocumentValidationEntity(input);
        documentValidation.changeDocumentFrontBase64('iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC');

        expect(documentValidation.document_front_base64).toEqual('iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC');
    });

    it("Should change document_front_status", async () => {
         const input: DocumentValidationProps = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send
        };

        const documentValidation = new DocumentValidationEntity(input);
        documentValidation.changeDocumentFrontStatus(UserDocumentValidationStatus.approved);

        expect(documentValidation.document_front_status).toEqual(UserDocumentValidationStatus.approved);
    });

    it("Should change document_back_base64", async () => {
         const input: DocumentValidationProps = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send
        };

        const documentValidation = new DocumentValidationEntity(input);
        documentValidation.changeDocumentBackBase64('iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC');

        expect(documentValidation.document_back_base64).toEqual('iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC');
    });

    it("Should change document_back_status", async () => {
         const input: DocumentValidationProps = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send
        };

        const documentValidation = new DocumentValidationEntity(input);
        documentValidation.changeDocumentBackStatus(UserDocumentValidationStatus.approved);

        expect(documentValidation.document_back_status).toEqual(UserDocumentValidationStatus.approved);
    });

    it("Should change selfie_base64", async () => {
         const input: DocumentValidationProps = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send
        };

        const documentValidation = new DocumentValidationEntity(input);
        documentValidation.changeSelfieBase64('iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC');

        expect(documentValidation.selfie_base64).toEqual('iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC');
    });

    it("Should change selfie_status", async () => {
         const input: DocumentValidationProps = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send
        };

        const documentValidation = new DocumentValidationEntity(input);
        documentValidation.changeSelfieStatus(UserDocumentValidationStatus.approved);

        expect(documentValidation.selfie_status).toEqual(UserDocumentValidationStatus.approved);
    });

    it("Should change document_selfie_base64", async () => {
         const input: DocumentValidationProps = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send
        };

        const documentValidation = new DocumentValidationEntity(input);
        documentValidation.changeDocumentSelfieBase64('iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC');

        expect(documentValidation.document_selfie_base64).toEqual('iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC');
    });

    it("Should change document_selfie_status", async () => {
         const input: DocumentValidationProps = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send
        };

        const documentValidation = new DocumentValidationEntity(input);
        documentValidation.changeDocumentSelfieStatus(UserDocumentValidationStatus.approved);

        expect(documentValidation.document_selfie_status).toEqual(UserDocumentValidationStatus.approved);
    });
});