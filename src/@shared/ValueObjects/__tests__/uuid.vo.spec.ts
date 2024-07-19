import { Uuid } from '../uuid.vo'
import { validate as uuidValidate } from 'uuid'

describe("UUID Unit tests", () => {
    const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate')

    it("Should throw error if uuid is invalid", () => {

        expect(() => {
            new Uuid("Invalid uuid")
        }).toThrow("Invalid uuid")
        expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    it("Should create a valid uuid", () => {
        const uuid = new Uuid()

        expect(uuid.uuid).toBeDefined()
        expect(uuidValidate(uuid.uuid)).toBe(true)
        expect(validateSpy).toHaveBeenCalledTimes(1)

    })

    it("Should accept a valid uuid", () => {
        const uuid = new Uuid('8ecfc6ca-b943-4c50-afd2-f86c32542b8c')
        expect(uuid.uuid).toBe('8ecfc6ca-b943-4c50-afd2-f86c32542b8c')
        expect(validateSpy).toHaveBeenCalledTimes(1)

    })
})