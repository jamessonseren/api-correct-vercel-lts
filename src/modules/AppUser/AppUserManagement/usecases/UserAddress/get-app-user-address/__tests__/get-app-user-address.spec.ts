import { Uuid } from '../../../../../../../@shared/ValueObjects/uuid.vo';
import { GetAppUserAddressUsecase } from '../get-app-user-address.usecase'
const addressMockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
    }
}

const AppUserInfoMockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        saveOrUpdate: jest.fn(),
        findByDocumentUserInfo: jest.fn(),
        save: jest.fn(),
        findByDocument2UserInfo: jest.fn(),
        findManyByBusiness: jest.fn()

    };
};
describe("Unity test get app user address", () => {
    it("Should throw and error if document is missing", async () => {
        const addressRepository = addressMockRepository()
        const userInfoRepository = AppUserInfoMockRepository()

        const input = {
            document: ''
        }

        const usecase = new GetAppUserAddressUsecase(addressRepository, userInfoRepository)

        try {
            await usecase.execute(input.document)
        } catch (err: any) {
            expect(err.message).toBe("User document is required")
            expect(err.statusCode).toBe(400)

        }
    })

    it("Should throw and error if user info cannot be found", async () => {
        const addressRepository = addressMockRepository()
        const userInfoRepository = AppUserInfoMockRepository()

        const input = {
            document: '12345678907'
        }

        const usecase = new GetAppUserAddressUsecase(addressRepository, userInfoRepository)
        try {
            await usecase.execute(input.document)
        } catch (err: any) {
            expect(err.message).toBe("Unable to find user by document")
            expect(err.statusCode).toBe(404)

        }
    })

    it("Should throw and error if user address cannot be found", async () => {
        const addressRepository = addressMockRepository()
        const userInfoRepository = AppUserInfoMockRepository()

        userInfoRepository.findByDocumentUserInfo.mockResolvedValueOnce({

        })
        const input = {
            document: '12345678907'
        }

        const usecase = new GetAppUserAddressUsecase(addressRepository, userInfoRepository)
        try {
            await usecase.execute(input.document)
        } catch (err: any) {
            expect(err.message).toBe("Unable to find user address")
            expect(err.statusCode).toBe(404)

        }
    })

    it("Should return user Address", async () => {
        const addressRepository = addressMockRepository()
        const userInfoRepository = AppUserInfoMockRepository()

        userInfoRepository.findByDocumentUserInfo.mockResolvedValueOnce({
            business_info_uuid: null,
            address_uuid: new Uuid("3c17d070-d708-4eb3-a981-f5fb69182c74"),
            document: '12345678907',
            document2: null,
            document3: null,
            full_name: "User Full Name",
            display_name: null,
            internal_company_code: null,
            gender: null,
            date_of_birth: '05/04/94',
            salary: null,
            phone: null,
            email: "email@email.com",
            company_owner: false,
            status: 'pending',
            function: null,
            recommendation_code: null,
            is_authenticated: false,
            marital_status: null,
            dependents_quantity: 1,
            user_document_validation_uuid: null,
            user_id: null
        })

        addressRepository.find.mockResolvedValue({
            uuid: new Uuid("3c17d070-d708-4eb3-a981-f5fb69182c74"),
            line1: "Rua teste",
            line2: "41B",
            line3: "",
            postal_code: "02457-458",
            neighborhood: "Bairro Teste",
            city: "Cidade teste",
            state: "Estado teste",
            country: "País",

        })
        const input = {
            document: '12345678907'
        }

        const usecase = new GetAppUserAddressUsecase(addressRepository, userInfoRepository)

        const result = await usecase.execute(input.document)

        expect(result.uuid).toEqual(new Uuid("3c17d070-d708-4eb3-a981-f5fb69182c74"));
        expect(result.line1).toEqual("Rua teste");
        expect(result.line2).toEqual("41B");
        expect(result.line3).toEqual("");
        expect(result.postal_code).toEqual("02457-458");
        expect(result.neighborhood).toEqual("Bairro Teste");
        expect(result.city).toEqual("Cidade teste");
        expect(result.state).toEqual("Estado teste");
        expect(result.country).toEqual("País");

    })
})