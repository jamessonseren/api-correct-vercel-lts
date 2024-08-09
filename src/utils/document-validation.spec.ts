import { DocumentValidator } from "./document-validation";

describe("Unity Test Document Validation test", () => {
    it("Should throw an error if document is missing", () => {
        const document = '';
        const validator = new DocumentValidator();

        expect(() => {
            validator.validator(document);
        }).toThrow("Document is required");
    });

    it("Should throw an error if document is invalid", () => {
        const document = '123.456.789-07';
        const validator = new DocumentValidator();

        expect(() => {
            validator.validator(document);
        }).toThrow("Invalid Document");
    });

    it("Should throw an error if document does not have 11 digits", () => {
        const document = '12.456.789-7';
        const validator = new DocumentValidator();

        expect(() => {
            validator.validator(document);
        }).toThrow("Document must have 11 characters");
    });

    it("Should return a valid document with only numbers", () => {
        const document = '403.539.780-60';
        const document2 = '40353978060';
        const validator = new DocumentValidator();

        const output = validator.validator(document);
        const output2 = validator.validator(document2);

        expect(output).toEqual("40353978060");
        expect(output2).toEqual(document2);
    });
});