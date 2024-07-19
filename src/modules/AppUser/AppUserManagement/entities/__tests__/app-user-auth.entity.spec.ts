import { Uuid } from '../../../../../@shared/ValueObjects/uuid.vo'
import { AppUserAuthProps, AppUserAuthSignUpEntity } from '../app-user-auth.entity'


describe("Unity Test App User auth Entity", () => {
    it("Should throw an error if document is empty", () => {
        const input: AppUserAuthProps = {
            user_info_uuid: null,
            document: '',
            email: 'email@email.com',
            password: 'password123',
            is_active: true
        }

        expect(() => {
            new AppUserAuthSignUpEntity(input)
        }).toThrow("Document is required")
    })

    it("Should throw an error if password is empty", () => {
        const input: AppUserAuthProps = {
            user_info_uuid: null,
            document: '12345678900',
            email: 'email@email.com',
            password: '',
            is_active: true
        }

        expect(() => {
            new AppUserAuthSignUpEntity(input)
        }).toThrow("Password is required")
    })

    it("Should throw an error if email is empty", () => {
        const input: AppUserAuthProps = {
            user_info_uuid: null,
            document: '12345678900',
            email: '',
            password: 'senha123',
            is_active: true
        }

        expect(() => {
            new AppUserAuthSignUpEntity(input)
        }).toThrow("Email is required")
    })

    it("Should throw an error if email is invalid", () => {
        const input: AppUserAuthProps = {
            user_info_uuid: null,
            document: '12345678900',
            email: 'aafdafa',
            password: 'senha123',
            is_active: true
        }

        expect(() => {
            new AppUserAuthSignUpEntity(input)
        }).toThrow("Invalid email format")
    })
    

  


    it("Should create an appuser", async () => {
        const input: AppUserAuthProps = {
            user_info_uuid: null,
            document: '40353978060',
            email: 'aafdafa@iaofda.com',
            password: 'senha123',
            is_active: true
        }

        const userAuth = await AppUserAuthSignUpEntity.create(input)

        expect(userAuth).toHaveProperty('uuid')
        expect(userAuth.document).toEqual(input.document)
        expect(userAuth.email).toEqual(input.email)
        expect(userAuth.password.length).toEqual(60)
    })

    it("Should change email", async () => {
        const input: AppUserAuthProps = {
            user_info_uuid: null,
            document: '40353978060',
            email: 'aafdafa@iaofda.com',
            password: 'senha123',
            is_active: true
        }

        const userAuth = new AppUserAuthSignUpEntity(input)

        userAuth.changeEmail('email@email.com')

        expect(userAuth.email).toEqual('email@email.com')
    })

    it("Should change document", async () => {
        const input: AppUserAuthProps = {
            user_info_uuid: null,
            document: '40353978060',
            email: 'aafdafa@iaofda.com',
            password: 'senha123',
            is_active: true
        }

        const userAuth = new AppUserAuthSignUpEntity(input)

        userAuth.changeDocument('40353978060')

        expect(userAuth.document).toEqual('40353978060')
    })

    it("Should change userInfo", async () => {
        const input: AppUserAuthProps = {
            user_info_uuid: null,
            document: '40353978060',
            email: 'aafdafa@iaofda.com',
            password: 'senha123',
            is_active: true
        }

        const userAuth = new AppUserAuthSignUpEntity(input)

        userAuth.changeUserInfo(new Uuid("3c17d070-d708-4eb3-a981-f5fb69182c74"))

        expect(userAuth.user_info_uuid?.uuid).toEqual('3c17d070-d708-4eb3-a981-f5fb69182c74')
    })
})

it("Should change password", async () => {
    const input: AppUserAuthProps = {
        user_info_uuid: null,
        document: '40353978060',
        email: 'aafdafa@iaofda.com',
        password: 'senha123',
        is_active: true
    }

    const userAuth = new AppUserAuthSignUpEntity(input)

   await userAuth.changePassword('98765432158')

    expect(userAuth.password.length).toEqual(60)
})