import { Status } from '@prisma/client';
import { Uuid } from '../../../../../../../@shared/ValueObjects/uuid.vo';
import { InputCreateAppUserDTO } from '../../../../../app-user-dto/app-user.dto'
import { AppUserAuthSignUpUsecase } from '../app-user-auth.signup.usecase'



const AppUserSignUpMockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        findByDocument: jest.fn(),
        findByEmail: jest.fn()
    };
};

const AppUserInfoMockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        saveOrUpdate: jest.fn(),
        findByDocumentUserInfo: jest.fn(),
        //findByEmailUserInfo: jest.fn(),
        findByDocument2UserInfo: jest.fn(),
        // findByDocument3UserInfo: jest.fn(),
        findManyByBusiness: jest.fn(),
        save: jest.fn(),
        // create: jest.fn(),
        // update: jest.fn(),
        // find: jest.fn(),
        // findAll: jest.fn(),
    };
};
describe("Unity test create app user auth", () => {
    it("Should throw an error if document is already registered", async () => {
        const appUserInput: InputCreateAppUserDTO = {
            user_info_uuid: null,
            document: '11234644053',
            email: 'email@email.com',
            password: 'senha123',
            is_active: true
        }

        const appUserAuthMockRepository = AppUserSignUpMockRepository()
        const appUserInfoMockRepository = AppUserInfoMockRepository()

        appUserAuthMockRepository.findByDocument.mockResolvedValueOnce({
            uuid:'1',
            user_info_uuid: '',
            document: '11234644053',
            email: 'email@email.com',
            password: 'senha123',
            is_active: true
        })
        const usecase = new AppUserAuthSignUpUsecase(appUserAuthMockRepository, appUserInfoMockRepository)
        
        await expect(usecase.execute(appUserInput)).rejects.toThrow("User already has an account")

    })

    it("Should throw an error if email is already registered", async () => {
        const appUserInput: InputCreateAppUserDTO = {
            user_info_uuid: null,
            document: '11234644053',
            email: 'email@email.com',
            password: 'senha123',
            is_active: true
        }

        const appUserAuthMockRepository = AppUserSignUpMockRepository()
        const appUserInfoMockRepository = AppUserInfoMockRepository()

        appUserAuthMockRepository.findByEmail.mockResolvedValueOnce({
            uuid:'1',
            user_info_uuid: '',
            document: '40353978060',
            email: 'email@email.com',
            password: 'senha123',
            is_active: true
        })
        const usecase = new AppUserAuthSignUpUsecase(appUserAuthMockRepository, appUserInfoMockRepository)
        
        await expect(usecase.execute(appUserInput)).rejects.toThrow("Email already in use")

    })

    it("Should create a new User", async () => {
        const appUserInput: InputCreateAppUserDTO = {
            user_info_uuid: null,
            document: '403.539.780-60',
            email: 'email@email.com',
            password: 'senha123',
            is_active: true
        }

        const appUserAuthMockRepository = AppUserSignUpMockRepository()
        const appUserInfoMockRepository = AppUserInfoMockRepository()

        const usecase = new AppUserAuthSignUpUsecase(appUserAuthMockRepository, appUserInfoMockRepository)

        const output = await usecase.execute(appUserInput)
        //expect(output).toHaveProperty('uuid')
        expect(output.user_info_uuid).toEqual(appUserInput.user_info_uuid)
        expect(output.document).toEqual('40353978060')
        expect(output.email).toEqual(appUserInput.email)
        expect(output.is_active).toEqual(appUserInput.is_active)
    })

    it("Should create a new User when user info is already registered", async () => {
        const appUserInput: InputCreateAppUserDTO = {
            user_info_uuid: null,
            document: '40353978060',
            email: 'email@email.com',
            password: 'senha123',
            is_active: true
        }

        const appUserAuthMockRepository = AppUserSignUpMockRepository()
        const appUserInfoMockRepository = AppUserInfoMockRepository()

        appUserInfoMockRepository.findByDocumentUserInfo.mockResolvedValueOnce(
            {
            uuid: new Uuid("8ecfc6ca-b943-4c50-afd2-f86c32542b8c"),
            business_info_uuid: null,
            address_uuid: null,
            document:'40353978060',
            document2: null,
            document3: null,
            full_name: "ksjhfd qjf asfa ",
            display_name: null,
            internal_company_code: null,
            gender: null,
            phone: null,
            email: "email@email.com",
            salary: null,
            company_owner: false,
            status: Status.active,
            function: null,
            recommendation_code: null,
            is_authenticated: false,
            marital_status: null,
            dependents_quantity:1,
            user_document_validation_uuid: null,
        }
    )

        const usecase = new AppUserAuthSignUpUsecase(appUserAuthMockRepository, appUserInfoMockRepository)

        const output = await usecase.execute(appUserInput)

        //expect(output).toHaveProperty('uuid')
        expect(output.user_info_uuid?.uuid).toEqual("8ecfc6ca-b943-4c50-afd2-f86c32542b8c")
        expect(output.email).toEqual(appUserInput.email)
        expect(output.is_active).toEqual(appUserInput.is_active)
    })
})