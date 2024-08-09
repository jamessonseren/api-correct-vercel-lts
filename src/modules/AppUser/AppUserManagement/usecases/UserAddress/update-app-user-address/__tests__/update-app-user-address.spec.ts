import { Uuid } from '../../../../../../../@shared/ValueObjects/uuid.vo';
import { InputUpdateAppUserAddressDTO } from '../dto/update-app-user-address.dto'
import { UpdateAppUserAddressUsecase } from '../update-app-user-address.usecase'

const AddressMockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        createAddress: jest.fn()
    }
}

const UserInfoMockRepository = () => {
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
}

const AppUserAuthMockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        findByDocument: jest.fn(),
        findByEmail: jest.fn()
    };
};
describe("Unity test Update App user address", () => {
    it("Should throw an error if user auth is not found", async () => {
        const addressRepository = AddressMockRepository()
        const userinfoRepository = UserInfoMockRepository()
        const userAuthRepository = AppUserAuthMockRepository()

        const input:InputUpdateAppUserAddressDTO = {
            line1: "Rua teste",
            line2: "41B",
            line3: "",
            postal_code: "02457-458",
            neighborhood: "Bairro Teste",
            city: "Cidade teste",
            state: "Estado teste",
            country: "País",
            user_uuid: new Uuid("8c47d070-d708-4eb3-a981-f5fb69184c74")
        }

        const usecase = new UpdateAppUserAddressUsecase(addressRepository, userinfoRepository, userAuthRepository)
        
        try{
            await usecase.execute(input)

        }catch(err: any){
            expect(err.message).toBe("User auth not found")
            expect(err.statusCode).toBe(404)
        }
    })

    it("Should throw an erro if user info is not found", async () => {
        const addressRepository = AddressMockRepository()
        const userinfoRepository = UserInfoMockRepository()
        const userAuthRepository = AppUserAuthMockRepository()

        userAuthRepository.find.mockResolvedValueOnce({})

        const input:InputUpdateAppUserAddressDTO = {
            line1: "Rua teste",
            line2: "41B",
            line3: "",
            postal_code: "02457-458",
            neighborhood: "Bairro Teste",
            city: "Cidade teste",
            state: "Estado teste",
            country: "País",
            user_uuid: new Uuid("8c47d070-d708-4eb3-a981-f5fb69184c74")
        }

        const usecase = new UpdateAppUserAddressUsecase(addressRepository, userinfoRepository, userAuthRepository)
        
        try{
            await usecase.execute(input)

        }catch(err: any){
            expect(err.message).toBe("User info not found")
            expect(err.statusCode).toBe(404)
        }
    })

    it("Should throw an erro if user info is not found", async () => {
        const addressRepository = AddressMockRepository()
        const userInfoRepository = UserInfoMockRepository()
        const userAuthRepository = AppUserAuthMockRepository()

        userAuthRepository.find.mockResolvedValueOnce({})
        userInfoRepository.findByDocumentUserInfo.mockResolvedValueOnce({})

        const input:InputUpdateAppUserAddressDTO = {
            line1: "Rua teste",
            line2: "41B",
            line3: "",
            postal_code: "02457-458",
            neighborhood: "Bairro Teste",
            city: "Cidade teste",
            state: "Estado teste",
            country: "País",
            user_uuid: new Uuid("8c47d070-d708-4eb3-a981-f5fb69184c74")
        }

        const usecase = new UpdateAppUserAddressUsecase(addressRepository, userInfoRepository, userAuthRepository)
        
        try{
            await usecase.execute(input)

        }catch(err: any){
            expect(err.message).toBe("User address not found")
            expect(err.statusCode).toBe(404)
        }
    })

    it("Should update user address", async () => {
        const addressRepository = AddressMockRepository()
        const userInfoRepository = UserInfoMockRepository()
        const userAuthRepository = AppUserAuthMockRepository()

        userAuthRepository.find.mockResolvedValueOnce({
            uuid: new Uuid("8ecfc6ca-b943-4c50-afd2-f86c32542b8c"),
            user_info_uuid: null,
            document: '588.225.170-24',
            password: 'password123',
            email: 'email@email.com',
            is_active: true,
            created_at: '2024-05-04',
            updated_at: ''
        })
        userInfoRepository.findByDocumentUserInfo.mockResolvedValueOnce({
            uuid: new Uuid("8ecfc6ca-b943-4c50-afd2-f86c32542b8c"),
            business_info_uuid: null,
            address_uuid: new Uuid("8e27d070-d204-4eb3-a981-f5fb69184e54"),
            document: '588.225.170-24',
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
        })
        addressRepository.find.mockResolvedValueOnce({
            uuid: new Uuid("8e27d070-d204-4eb3-a981-f5fb69184e54"),
            line1: "Rua teste antigo",
            line2: "41B antigo",
            line3: "antigo",
            postal_code: "42457-698",
            neighborhood: "Bairro Teste antigo",
            city: "Cidade teste antigo",
            state: "Estado teste antigo",
            country: "País antigo",
            user_uuid: new Uuid("8c47d070-d708-4eb3-a981-f5fb69184c74")
        })
        
        const input:InputUpdateAppUserAddressDTO = {
            line1: "Rua teste",
            line2: "41B",
            line3: "",
            postal_code: "02457-458",
            neighborhood: "Bairro Teste",
            city: "Cidade teste",
            state: "Estado teste",
            country: "País",
            user_uuid: new Uuid("8ecfc6ca-b943-4c50-afd2-f86c32542b8c")
        }

        const usecase = new UpdateAppUserAddressUsecase(addressRepository, userInfoRepository, userAuthRepository)
        
        const result = await usecase.execute(input)

        expect(result.line1).toEqual(input.line1)
        expect(result.line2).toEqual(input.line2)
        expect(result.line3).toEqual(input.line3)
        expect(result.postal_code).toEqual(input.postal_code)
        expect(result.neighborhood).toEqual(input.neighborhood)
        expect(result.city).toEqual(input.city)
        expect(result.state).toEqual(input.state)
        expect(result.country).toEqual(input.country)
        
    })
})