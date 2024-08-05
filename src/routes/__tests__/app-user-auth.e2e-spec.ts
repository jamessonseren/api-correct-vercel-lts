import request from "supertest"
import { app } from "../../app"
import { InputCreateAppUserDTO, InputCreateUserInfoDTO } from "../../modules/AppUser/app-user-dto/app-user.dto"
import { Status } from "@prisma/client"
import { Uuid } from "../../@shared/ValueObjects/uuid.vo"

const inputNewAdmin = {
    name: "Admin Correct",
    email: "admincorrect@correct.com.br",
    userName: "admin-correct",
    password: "123"
};

const authenticateAdmin = {
    userName: inputNewAdmin.userName,
    password: inputNewAdmin.password
};

let authUserToken: string;

const inputNewAppUser: InputCreateAppUserDTO = {
    user_info_uuid: null,
    document: '11234644053',
    email: 'email@email.com',
    password: 'senha123',
    is_active: true
}

const authenticateAppUser = {
    document: inputNewAppUser.document,
    password: inputNewAppUser.password
}

const inputUserwithInfo = {
    user_info_uuid: new Uuid("8ecfc6ca-b943-4c50-afd2-f86c32542b8c"),
    document: '40353978060',
    email: 'other-user@email.com',
    password: 'senha123',
    is_active: true
}

const authenticateOtherAppUser = {
    document: inputNewAppUser.document,
    password: inputNewAppUser.password
}

const inputUserInfo: InputCreateUserInfoDTO = {
    uuid: new Uuid("8ecfc6ca-b943-4c50-afd2-f86c32542b8c"),
    business_info_uuid: null,
    address_uuid: null,
    document: '40353978060',
    document2: null,
    document3: null,
    full_name: "ksjhfd qjf asfa ",
    display_name: null,
    internal_company_code: null,
    gender: null,
    date_of_birth: null,
    phone: null,
    email: "other-user@email.com",
    salary: null,
    company_owner: false,
    status: Status.active,
    function: null,
    recommendation_code: null,
    is_authenticated: false,
    marital_status: null,
    dependents_quantity: 1,
    user_document_validation_uuid: null,
}

let otherUserToken: string


describe("E2E App User Auth tests", () => {

    describe("Create app user", () => {


        it("Should throw an error if document is invalid", async () => {
            const inputNewAppUser2: InputCreateAppUserDTO = {
                user_info_uuid: null,
                document: '112346440535454',
                email: 'email@email.com',
                password: 'senha123',
                is_active: true
            }
            const user2 = await request(app).post("/app-user").send(inputNewAppUser2)
            
            expect(user2.statusCode).toBe(400)
            expect(user2.body.error).toEqual("Document must have 11 characters")

        })
        it("Should throw an error if email is invalid", async () => {
            const inputNewAppUser2: InputCreateAppUserDTO = {
                user_info_uuid: null,
                document: '11234644053',
                email: 'email.com',
                password: 'senha123',
                is_active: true
            }
            const user2 = await request(app).post("/app-user").send(inputNewAppUser2)

            expect(user2.statusCode).toBe(400)
            expect(user2.body.error).toEqual("Invalid email format")

        })


        it("Should create a new app user", async () => {

            const result = await request(app).post("/app-user").send(inputNewAppUser)

            expect(result.statusCode).toBe(201)
            expect(result.body.document).toEqual(inputNewAppUser.document)
            expect(result.body.email).toEqual(inputNewAppUser.email)
            expect(result.body.is_active).toEqual(inputNewAppUser.is_active)

        })
        it("Should throw an error if document is already registered", async () => {
            const inputNewAppUser2: InputCreateAppUserDTO = {
                user_info_uuid: null,
                document: '11234644053',
                email: 'email@email.com',
                password: 'senha123',
                is_active: true
            }
            const user2 = await request(app).post("/app-user").send(inputNewAppUser2)

            expect(user2.statusCode).toBe(409)
            expect(user2.body.error).toEqual("User already has an account")

        })


        it("Should throw an error if email is already registered", async () => {
            const inputNewAppUser2: InputCreateAppUserDTO = {
                user_info_uuid: null,
                document: '40353978060',
                email: 'email@email.com',
                password: 'senha123',
                is_active: true
            }
            const user2 = await request(app).post("/app-user").send(inputNewAppUser2)

            expect(user2.statusCode).toBe(409)
            expect(user2.body.error).toEqual("Email already in use")

        })
    })

    describe("Login App user", () => {

        it("Should throw an error if document is missing ", async () => {
            const result = await request(app).post("/login-app-user").send({
                document: '',
                password: 'password'
            })
            expect(result.statusCode).toBe(401)
            expect(result.body.error).toBe("Document/password is incorrect - 0")
        })

        it("Should throw an error if password is missing ", async () => {
            const result = await request(app).post("/login-app-user").send({
                document: 'document',
                password: ''
            })
            expect(result.statusCode).toBe(401)
            expect(result.body.error).toBe("Document/password is incorrect - 0")
        })

        it("Should throw an error if document does not have 11 digits ", async () => {
            const result = await request(app).post("/login-app-user").send({
                document: '112346440535485',
                password: 'password'
            })
            expect(result.statusCode).toBe(401)
            expect(result.body.error).toBe("Invalid document - 1")
        })
        it("Should throw an error if all digits are equals ", async () => {
            const result = await request(app).post("/login-app-user").send({
                document: '00000000000',
                password: 'password'
            })
            expect(result.statusCode).toBe(401)
            expect(result.body.error).toBe("Invalid document - 2")
        })
        it("Should throw an error if document is invalid ", async () => {
            const result = await request(app).post("/login-app-user").send({
                document: '12345678912',
                password: 'password'
            })
            expect(result.statusCode).toBe(401)
            expect(result.body.error).toBe("Invalid document - 3")
        })

        it("Should throw an error if document is not found ", async () => {
            const result = await request(app).post("/login-app-user").send({
                document: '40353978060',
                password: inputNewAppUser.password
            })
            expect(result.statusCode).toBe(401)
            expect(result.body.error).toBe("Document/password is incorrect 1")
        })

        it("Should throw an error if password is incorrect ", async () => {
            const result = await request(app).post("/login-app-user").send({
                document: inputNewAppUser.document,
                password: 'inputNewAppUser.password'
            })
            expect(result.statusCode).toBe(401)
            expect(result.body.error).toBe("Document/password is incorrect")
        })

        it("Should login app user with only number document", async () => {
            const result = await request(app).post("/login-app-user").send(authenticateAppUser)

            authUserToken = result.body.token
            expect(result.statusCode).toBe(200)
        })
        it("Should login app user with only number document", async () => {
            const input = {
                document: '112.346.440-53',
                password: authenticateAppUser.password
            }

            const result = await request(app).post("/login-app-user").send(input)

            authUserToken = result.body.token
            expect(result.statusCode).toBe(200)
        })
    })

    describe("App user details", () => {

        it("Should throw an error if token is missing", async () => {

            const result = await request(app).get("/app-user")

            expect(result.statusCode).toBe(401)
            expect(result.body.error).toBe("Token is missing")
        })

        it("Should return only user auth", async () => {

            const result = await request(app)
                .get("/app-user")
                .set('Authorization', `Bearer ${authUserToken}`)


            expect(result.statusCode).toBe(200)
            expect(result.body.status).toBeFalsy()
            expect(result.body.UserAuthDetails.document).toEqual(inputNewAppUser.document)
            expect(result.body.UserAuthDetails.email).toEqual(inputNewAppUser.email)
            expect(result.body.UserInfo).toBeFalsy()
            expect(result.body.UserAddress).toBeFalsy()
            expect(result.body.UserValidation).toBeFalsy()
        })

    })
    //Fazer testes de quando o usuário já estiver registrado em userInfo
})