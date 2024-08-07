import { Uuid } from '../../../../../../../@shared/ValueObjects/uuid.vo'
import { InputCreateUserAddressDTO } from '../dto/create-app-user-address.dto'
import { CreateAppUserAddressUsecase } from '../create-app-user-address.usecase'

const addressMockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
    }
}
describe("Create App User Address usecase", () => {
    it("Should create user address", async () => {
        const addressRepository = addressMockRepository()

        const input:InputCreateUserAddressDTO = {
            line1: "Rua teste",
            line2: "41B",
            line3: "",
            postal_code: "02457-458",
            neighborhood: "Bairro Teste",
            city: "Cidade teste",
            state: "Estado teste",
            country: "País",
            user_uuid: new Uuid("3c17d070-d708-4eb3-a981-f5fb69182c74")
        }

        const usecase = new CreateAppUserAddressUsecase(addressRepository)

        const result = await usecase.execute(input)

        expect(result.line1).toEqual(input.line1)
        expect(result.line2).toEqual(input.line2)
        expect(result.line3).toEqual(input.line3)
        expect(result.postal_code).toEqual(input.postal_code)
        expect(result.neighborhood).toEqual(input.neighborhood)
        expect(result.city).toEqual(input.city)
        expect(result.state).toEqual(input.state)
        expect(result.country).toEqual(input.country)
        expect(result.user_uuid).toEqual(input.user_uuid)
        
    })
})