import { Status } from "@prisma/client";
import { Uuid } from "../../../../../../../@shared/ValueObjects/uuid.vo";
import { InputCreateAppUserDTO } from "../../../../../app-user-dto/app-user.dto"
import { AppUserAuthSignUpEntity } from "../../../../entities/app-user-auth.entity";
import { AppUserDetailsUsecase } from '../app-user-details.usecase'

// const appUserInput: InputCreateAppUserDTO = {
//     user_info_uuid: '',
//     document: '12345678925',
//     email: 'email@email.com',
//     password: 'senha123',
//     is_active: true
// }

// const appUser = new AppUserAuthSignUpEntity(appUserInput)



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
        save: jest.fn(),
        findByDocument2UserInfo: jest.fn(),
        findManyByBusiness:jest.fn()
        // create: jest.fn(),
        // update: jest.fn(),
        // find: jest.fn(),
        // findAll: jest.fn(),
    };
};


describe("Unit test find user auth by id", () => {
    

    it("Should throw an error if user does not exist", async () => {
        const appUserAuthMockRepository = AppUserSignUpMockRepository()
        const appUserInfoMockRepository = AppUserInfoMockRepository()

        const usecase = new AppUserDetailsUsecase(appUserAuthMockRepository, appUserInfoMockRepository)

        const input = {
            uuid: new Uuid("8ecfc6ca-b943-4c50-afd2-f86c32542b8c")
        }

        await expect(usecase.execute(input.uuid)).rejects.toThrow("User not found")

    })

    it("Should find user with only user auth completed", async () => {
        const appUserAuthMockRepository = AppUserSignUpMockRepository()
        const appUserInfoMockRepository = AppUserInfoMockRepository()

        appUserAuthMockRepository.find.mockResolvedValueOnce({
            uuid: new Uuid("8ecfc6ca-b943-4c50-afd2-f86c32542b8c"),
            user_info_uuid: '',
            document: '12345678925',
            email: 'email@email.com',
            is_active: true,
            created_at: '2024-05-04',
            updated_at: ''
        })

        const usecase = new AppUserDetailsUsecase(appUserAuthMockRepository, appUserInfoMockRepository)

        const input = {
            uuid: new Uuid("8ecfc6ca-b943-4c50-afd2-f86c32542b8c")
        }

        const result = await usecase.execute(input.uuid)

        expect(result.status).toBeFalsy()
        expect(result.UserAuthDetails.uuid).toEqual(input.uuid.uuid)
        expect(result.UserAuthDetails.user_info_uuid).toBeFalsy()
        expect(result.UserAuthDetails.document).toEqual('12345678925')
        expect(result.UserAuthDetails.email).toEqual('email@email.com')
        expect(result.UserInfo).toBeFalsy()
        expect(result.UserAddress).toBeFalsy()
        expect(result.UserValidation).toBeFalsy()

    })

    it("Should find user with user auth and user info completed", async () => {
        const appUserAuthMockRepository = AppUserSignUpMockRepository()
        const appUserInfoMockRepository = AppUserInfoMockRepository()

        appUserAuthMockRepository.find.mockResolvedValueOnce({
            uuid: new Uuid("8ecfc6ca-b943-4c50-afd2-f86c32542b8c"),
            user_info_uuid: new Uuid("5ef2c6ca-c443-4c50-afd2-f86c32542b8c"),
            document: '12345678925',
            email: 'email@email.com',
            is_active: true,
            created_at: '2024-05-04',
            updated_at: ''
        })

        appUserInfoMockRepository.findByDocumentUserInfo.mockResolvedValueOnce({
            uuid: new Uuid("5ef2c6ca-c443-4c50-afd2-f86c32542b8c"),
            business_info_uuid: null,
            address_uuid: null,
            document:'12345678925',
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
        })



        const usecase = new AppUserDetailsUsecase(appUserAuthMockRepository, appUserInfoMockRepository)

        const input = {
            uuid: new Uuid("8ecfc6ca-b943-4c50-afd2-f86c32542b8c")
        }

        const result = await usecase.execute(input.uuid)
        expect(result.status).toBeFalsy()
        expect(result.UserAuthDetails.uuid).toEqual(input.uuid.uuid)
        expect(result.UserAuthDetails.user_info_uuid).toEqual('5ef2c6ca-c443-4c50-afd2-f86c32542b8c')
        expect(result.UserAuthDetails.document).toEqual('12345678925')
        expect(result.UserAuthDetails.email).toEqual('email@email.com')
        expect(result.UserInfo).toBeTruthy()
        expect(result.UserAddress).toBeFalsy()
        expect(result.UserValidation).toBeFalsy()

    })
    it("Should find user with user auth, user info, and user Address ", async () => {
        const appUserAuthMockRepository = AppUserSignUpMockRepository()
        const appUserInfoMockRepository = AppUserInfoMockRepository()

        appUserAuthMockRepository.find.mockResolvedValueOnce({
            uuid: new Uuid("8ecfc6ca-b943-4c50-afd2-f86c32542b8c"),
            user_info_uuid: new Uuid("5ef2c6ca-c443-4c50-afd2-f86c32542b8c"),
            document: '12345678925',
            email: 'email@email.com',
            is_active: true,
            created_at: '2024-05-04',
            updated_at: ''
        })

        appUserInfoMockRepository.findByDocumentUserInfo.mockResolvedValueOnce({
            uuid: new Uuid("5ef2c6ca-c443-4c50-afd2-f86c32542b8c"),
            business_info_uuid: null,
            address_uuid: new Uuid("5ef2c6ca-c443-4c50-afd2-f86c32542b8c"),
            document:'12345678925',
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
        })

        const usecase = new AppUserDetailsUsecase(appUserAuthMockRepository, appUserInfoMockRepository)

        const input = {
            uuid: new Uuid("8ecfc6ca-b943-4c50-afd2-f86c32542b8c")
        }

       const result = await usecase.execute(input.uuid)

       expect(result.status).toBeFalsy()
       expect(result.UserAuthDetails.uuid).toEqual(input.uuid.uuid)
       expect(result.UserAuthDetails.user_info_uuid).toEqual('5ef2c6ca-c443-4c50-afd2-f86c32542b8c')
       expect(result.UserAuthDetails.document).toEqual('12345678925')
       expect(result.UserAuthDetails.email).toEqual('email@email.com')
       expect(result.UserInfo).toBeTruthy()
       expect(result.UserAddress).toBeTruthy()
       expect(result.UserValidation).toBeFalsy()

    })

    it("Should find user with user auth, user info, and user Address ", async () => {
        const appUserAuthMockRepository = AppUserSignUpMockRepository()
        const appUserInfoMockRepository = AppUserInfoMockRepository()

        appUserAuthMockRepository.find.mockResolvedValueOnce({
            uuid: new Uuid("8ecfc6ca-b943-4c50-afd2-f86c32542b8c"),
            user_info_uuid: new Uuid("5ef2c6ca-c443-4c50-afd2-f86c32542b8c"),
            document: '12345678925',
            email: 'email@email.com',
            is_active: true,
            created_at: '2024-05-04',
            updated_at: ''
        })

        appUserInfoMockRepository.findByDocumentUserInfo.mockResolvedValueOnce({
            uuid: new Uuid("5ef2c6ca-c443-4c50-afd2-f86c32542b8c"),
            business_info_uuid: null,
            address_uuid: new Uuid("5ef2c6ca-c443-4c50-afd2-f86c32542b8c"),
            document:'12345678925',
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
            user_document_validation_uuid: new Uuid("5ef2c6ca-c443-4c50-afd2-f86c32542b8c"),
        })

        const usecase = new AppUserDetailsUsecase(appUserAuthMockRepository, appUserInfoMockRepository)

        const input = {
            uuid: new Uuid("8ecfc6ca-b943-4c50-afd2-f86c32542b8c")
        }

       const result = await usecase.execute(input.uuid)

       expect(result.status).toBeTruthy()
       expect(result.UserAuthDetails.uuid).toEqual(input.uuid.uuid)
       expect(result.UserAuthDetails.user_info_uuid).toEqual('5ef2c6ca-c443-4c50-afd2-f86c32542b8c')
       expect(result.UserAuthDetails.document).toEqual('12345678925')
       expect(result.UserAuthDetails.email).toEqual('email@email.com')
       expect(result.UserInfo).toBeTruthy()
       expect(result.UserAddress).toBeTruthy()
       expect(result.UserValidation).toBeTruthy()

    })
})
