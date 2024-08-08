import request from "supertest"
import { app } from "../../app"
import { InputCreateAppUserDTO } from "../../modules/AppUser/app-user-dto/app-user.dto"
import { InputCreateUserInfoDTO } from "../../modules/AppUser/AppUserManagement/usecases/UserInfo/create-user-info/dto/create-user-info.dto";
import { InputCreateUserAddressDTO } from "../../modules/AppUser/AppUserManagement/usecases/UserAddress/create-app-user-address/dto/create-app-user-address.dto";
import { Uuid } from "../../@shared/ValueObjects/uuid.vo";

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




let otherUserToken: string


describe("E2E App User Auth tests", () => {

    describe("App User Auth", () => {

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
                expect(result.statusCode).toBe(400)
                expect(result.body.error).toBe("Document/password is incorrect")
            })

            it("Should throw an error if password is missing ", async () => {
                const result = await request(app).post("/login-app-user").send({
                    document: 'document',
                    password: ''
                })

                expect(result.statusCode).toBe(400)
                expect(result.body.error).toBe("Document/password is incorrect")
            })


            it("Should throw an error if document is not found ", async () => {
                const result = await request(app).post("/login-app-user").send({
                    document: '40353978060',
                    password: inputNewAppUser.password
                })
                expect(result.statusCode).toBe(401)
                expect(result.body.error).toBe("Document/password is incorrect")
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
            it("Should login app user with full document", async () => {
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
    })

    describe("App User Info", () => {

        describe("Create App User Info", () => {
            it("Should create a new user info", async () => {

                const input: InputCreateUserInfoDTO = {
                    business_info_uuid: null,
                    address_uuid: null,
                    document: '11234644053',
                    document2: null,
                    document3: null,
                    full_name: "User Full Name",
                    display_name: null,
                    internal_company_code: null,
                    gender: 'Male',
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
                }


                const result = await request(app).post("/app-user/info").set('Authorization', `Bearer ${authUserToken}`).send(input)
                const userDetails = await request(app)
                    .get("/app-user")
                    .set('Authorization', `Bearer ${authUserToken}`)

                expect(result.statusCode).toBe(201)
                expect(result.body.sucess).toEqual("User info registered successfully")
                expect(userDetails.body.UserInfo).toBeTruthy()

            })
            it("Should throw an error if user info is already registered and tables are already synchronized", async () => {

                const input: InputCreateUserInfoDTO = {
                    business_info_uuid: null,
                    address_uuid: null,
                    document: '11234644053',
                    document2: null,
                    document3: null,
                    full_name: "User Full Name",
                    display_name: null,
                    internal_company_code: null,
                    gender: 'Male',
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
                }

                const createUser = await request(app).post("/app-user/info").set('Authorization', `Bearer ${authUserToken}`).send(input)


                expect(createUser.body.error).toBe("User Info already registered - 1")
                expect(createUser.statusCode).toBe(409)
            })

            it("Should throw an error if user info is already registered and tables are not synchronized", async () => {
                //IMPORTANT: This test will happen when correct admin registers user info before user downloads the app.
                //When the user registers itself in userAuth table, the api will check if correct admin already created user info and will synchronize tables.
                //this test still need to be created


                // const inputNewAppUser: InputCreateAppUserDTO = {
                //     user_info_uuid: null,
                //     document: '329.552.380-07',
                //     email: 'new-user@new-user.com',
                //     password: 'senha123',
                //     is_active: true
                // }
                // //create new user auth
                //  await request(app).post("/app-user").send(inputNewAppUser)

                // //login user
                // const userLogin = {
                //     document: inputNewAppUser.document,
                //     password: inputNewAppUser.password
                // }
                // const loginUser = await request(app).post("/login-app-user").send(userLogin)
                // const authUserTokenNew = loginUser.body.token

                // const input: InputCreateUserInfoDTO = {
                //     business_info_uuid: null,
                //     address_uuid: null,
                //     document: '11234644053',
                //     document2: null,
                //     document3: null,
                //     full_name: "User Full Name",
                //     display_name: null,
                //     internal_company_code: null,
                //     gender: 'Male',
                //     date_of_birth: '05/04/94',
                //     salary: null,
                //     phone: null,
                //     email: "email@email.com",
                //     company_owner: false,
                //     status: 'pending',
                //     function: null,
                //     recommendation_code: null,
                //     is_authenticated: false,
                //     marital_status: null,
                //     dependents_quantity: 1,
                //     user_document_validation_uuid: null,
                //     user_id: null
                // }


                // const createUser = await request(app).post("/app-user/info").set('Authorization', `Bearer ${authUserToken}`).send(input)


                // expect(createUser.body.error).toBe("User Info already registered - 1")
                // expect(createUser.statusCode).toBe(409)
            })

        })

        describe("Get User Info By User", () => {
            it("Should throw an error if document is missing", async () => {
                const input = {
                    document: ''
                }
                const result = await request(app).get("/app-user/info").set('Authorization', `Bearer ${authUserToken}`).send(input)

                expect(result.body.error).toBe("Document is required")
                expect(result.statusCode).toBe(400)

            })

            it("Should throw an error if user info is not found", async () => {
                const input = {
                    document: '123.456.789-07'
                }
                const result = await request(app).get("/app-user/info").set('Authorization', `Bearer ${authUserToken}`).send(input)

                expect(result.body.error).toBe("User info not found")
                expect(result.statusCode).toBe(404)

            })

            it("Should return user info", async () => {
                const input = {
                    document: '11234644053',
                }


                const result = await request(app).get("/app-user/info").set('Authorization', `Bearer ${authUserToken}`).send(input)

                expect(result.body).toHaveProperty("uuid")
                expect(result.body.document).toBe(input.document)

            })
        })
    })
    describe("Unity test User Address", () => {
        describe("Create app user address", () => {
            it("Should throw an error if line 1 is missing", async () => {
                const input = {
                    line1: "",
                    line2: "41B",
                    line3: "",
                    postal_code: "02457-458",
                    neighborhood: "Bairro Teste",
                    city: "Cidade teste",
                    state: "Estado teste",
                    country: "País",
                }

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input)

                expect(result.body.error).toBe("Line1 is required")
                expect(result.statusCode).toBe(400)
            })
            it("Should throw an error if line 2 is missing", async () => {
                const input = {
                    line1: "Rua teste",
                    line2: "",
                    line3: "",
                    postal_code: "02457-458",
                    neighborhood: "Bairro Teste",
                    city: "Cidade teste",
                    state: "Estado teste",
                    country: "País",

                }

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input)

                expect(result.body.error).toBe("Line2 is required")
                expect(result.statusCode).toBe(400)
            })

            it("Should throw an error if postal code is missing", async () => {
                const input = {
                    line1: "Rua teste",
                    line2: "41B",
                    line3: "",
                    postal_code: "",
                    neighborhood: "Bairro Teste",
                    city: "Cidade teste",
                    state: "Estado teste",
                    country: "País",

                }


                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input)

                expect(result.body.error).toBe("Postal code is required")
                expect(result.statusCode).toBe(400)
            })

            it("Should throw an error if postal code is missing", async () => {
                const input = {
                    line1: "Rua teste",
                    line2: "41B",
                    line3: "",
                    postal_code: "02457-458",
                    neighborhood: "",
                    city: "Cidade teste",
                    state: "Estado teste",
                    country: "País",

                }

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input)

                expect(result.body.error).toBe("Neighborhood is required")
                expect(result.statusCode).toBe(400)
            })

            it("Should throw an error if city is missing", async () => {
                const input = {
                    line1: "Rua teste",
                    line2: "41B",
                    line3: "",
                    postal_code: "02457-458",
                    neighborhood: "Bairro Teste",
                    city: "",
                    state: "Estado teste",
                    country: "País",

                }

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input)

                expect(result.body.error).toBe("City is required")
                expect(result.statusCode).toBe(400)
            })

            it("Should throw an error if state is missing", async () => {
                const input = {
                    line1: "Rua teste",
                    line2: "41B",
                    line3: "",
                    postal_code: "02457-458",
                    neighborhood: "Bairro Teste",
                    city: "Cidade teste",
                    state: "",
                    country: "País",

                }

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input)

                expect(result.body.error).toBe("State is required")
                expect(result.statusCode).toBe(400)
            })

            it("Should throw an error if country is missing", async () => {
                const input = {
                    line1: "Rua teste",
                    line2: "41B",
                    line3: "",
                    postal_code: "02457-458",
                    neighborhood: "Bairro Teste",
                    city: "Cidade teste",
                    state: "Estado teste",
                    country: "",

                }

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input)

                expect(result.body.error).toBe("Country is required")
                expect(result.statusCode).toBe(400)
            })

            it("Should throw an error if line 1 is not a string", async () => {
                const input = {
                    line1: 123,
                    line2: "41B",
                    line3: "",
                    postal_code: "02457-458",
                    neighborhood: "Bairro Teste",
                    city: "Cidade teste",
                    state: "Estado teste",
                    country: "País",

                };

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input);

                expect(result.body.error).toBe("Line1 must be a string");
                expect(result.statusCode).toBe(400);
            });

            it("Should throw an error if line 2 is not a string", async () => {
                const input = {
                    line1: "Rua teste",
                    line2: 123,
                    line3: "",
                    postal_code: "02457-458",
                    neighborhood: "Bairro Teste",
                    city: "Cidade teste",
                    state: "Estado teste",
                    country: "País",

                };

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input);

                expect(result.body.error).toBe("Line2 must be a string");
                expect(result.statusCode).toBe(400);
            });

            it("Should throw an error if line 3 is not a string", async () => {
                const input = {
                    line1: "Rua teste",
                    line2: "41B",
                    line3: 123,
                    postal_code: "02457-458",
                    neighborhood: "Bairro Teste",
                    city: "Cidade teste",
                    state: "Estado teste",
                    country: "País",

                };

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input);

                expect(result.body.error).toBe("Line3 must be a string");
                expect(result.statusCode).toBe(400);
            });

            it("Should throw an error if postal code is not a string", async () => {
                const input = {
                    line1: "Rua teste",
                    line2: "41B",
                    line3: "",
                    postal_code: 123456,
                    neighborhood: "Bairro Teste",
                    city: "Cidade teste",
                    state: "Estado teste",
                    country: "País",

                };

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input);

                expect(result.body.error).toBe("Postal code must be a string");
                expect(result.statusCode).toBe(400);
            });

            it("Should throw an error if neighborhood is not a string", async () => {
                const input = {
                    line1: "Rua teste",
                    line2: "41B",
                    line3: "",
                    postal_code: "02457-458",
                    neighborhood: 123,
                    city: "Cidade teste",
                    state: "Estado teste",
                    country: "País",

                };

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input);

                expect(result.body.error).toBe("Neighborhood must be a string");
                expect(result.statusCode).toBe(400);
            });

            it("Should throw an error if city is not a string", async () => {
                const input = {
                    line1: "Rua teste",
                    line2: "41B",
                    line3: "",
                    postal_code: "02457-458",
                    neighborhood: "Bairro Teste",
                    city: 123,
                    state: "Estado teste",
                    country: "País",

                };

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input);

                expect(result.body.error).toBe("City must be a string");
                expect(result.statusCode).toBe(400);
            });

            it("Should throw an error if state is not a string", async () => {
                const input = {
                    line1: "Rua teste",
                    line2: "41B",
                    line3: "",
                    postal_code: "02457-458",
                    neighborhood: "Bairro Teste",
                    city: "Cidade teste",
                    state: 123,
                    country: "País",

                };

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input);

                expect(result.body.error).toBe("State must be a string");
                expect(result.statusCode).toBe(400);
            });

            it("Should throw an error if country is not a string", async () => {
                const input = {
                    line1: "Rua teste",
                    line2: "41B",
                    line3: "",
                    postal_code: "02457-458",
                    neighborhood: "Bairro Teste",
                    city: "Cidade teste",
                    state: "Estado teste",
                    country: 123,

                };

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input);

                expect(result.body.error).toBe("Country must be a string");
                expect(result.statusCode).toBe(400);
            });

            it("Should create a new user address", async () => {
                const input = {
                    line1: "Rua teste",
                    line2: "41B",
                    line3: "",
                    postal_code: "02457-458",
                    neighborhood: "Bairro Teste",
                    city: "Cidade teste",
                    state: "Estado teste",
                    country: "Brasil",

                };

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input);
                const inputUserInfo = {
                    document: '11234644053',
                }

                const userInfo = await request(app).get("/app-user/info").set('Authorization', `Bearer ${authUserToken}`).send(inputUserInfo)
               
                expect(result.statusCode).toBe(201);
                expect(result.body.line1).toEqual(input.line1)
                expect(result.body.line2).toEqual(input.line2)
                expect(result.body.line3).toEqual(input.line3)
                expect(result.body.postal_code).toEqual(input.postal_code)
                expect(result.body.neighborhood).toEqual(input.neighborhood)
                expect(result.body.city).toEqual(input.city)
                expect(result.body.state).toEqual(input.state)
                expect(result.body.country).toEqual(input.country)
                expect(result.body.uuid).toEqual(userInfo.body.address_uuid)
            });
        })

        describe("Get User address", () => {
            it("Should throw an error if user document is missing", async () => {
                const input = {
                    document: ''
                }
                const result = await request(app).get("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input);

                expect(result.body.error).toBe("User document is required")
                expect(result.statusCode).toBe(400);

            })

            it("Should throw an error if user cannot be found by document", async () => {
                const input = {
                    document: '321564894518'
                }
                const result = await request(app).get("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(input);

                expect(result.body.error).toBe("Unable to find user by document")
                expect(result.statusCode).toBe(404);

            })
            it("Should throw an error if address does not exist", async () => {
                const inputOtherUser: InputCreateAppUserDTO = {
                    user_info_uuid: null,
                    document: '630.996.530-12',
                    email: 'email-new@email.com',
                    password: 'senha123',
                    is_active: true
                }

                const inputLoginUser = {
                    document: inputOtherUser.document,
                    password: inputOtherUser.password,
                }
                
                const inputCreateUserInfo: InputCreateUserInfoDTO = {
                    business_info_uuid: null,
                    address_uuid: null,
                    document: '630.996.530-12',
                    document2: null,
                    document3: null,
                    full_name: "User Full Name",
                    display_name: null,
                    internal_company_code: null,
                    gender: 'Male',
                    date_of_birth: '05/04/94',
                    salary: null,
                    phone: null,
                    email: "email-new@email.com",
                    company_owner: false,
                    status: 'pending',
                    function: null,
                    recommendation_code: null,
                    is_authenticated: false,
                    marital_status: null,
                    dependents_quantity: 1,
                    user_document_validation_uuid: null,
                    user_id: null
                }

                const inputGetUserAddress = {
                    document: inputCreateUserInfo.document
                }

                //create new User
                const otherUser = await request(app).post("/app-user").send(inputOtherUser)
                //login user
                const loginUser = await request(app).post("/login-app-user").send(inputLoginUser)
                const newAuthUserToken = loginUser.body.token

                //create user info
                await request(app).post("/app-user/info").set('Authorization', `Bearer ${newAuthUserToken}`).send(inputCreateUserInfo)
                //find address
                const result = await request(app).get("/app-user/address").set('Authorization', `Bearer ${newAuthUserToken}`).send(inputGetUserAddress);

                expect(result.body.error).toBe("Unable to find user address")
                expect(result.statusCode).toBe(404);

            })

            it("Should return user Address", async () => {
                const inputUserAddress = {
                    document: '11234644053',
                }

            
                const result = await request(app).get("/app-user/address").set('Authorization', `Bearer ${authUserToken}`).send(inputUserAddress);

                expect(result.statusCode).toBe(200);
                expect(result.body.line1).toBe("Rua teste")
                expect(result.body.line2).toBe("41B")
                expect(result.body.line3).toBeFalsy()
                expect(result.body.postal_code).toBe("02457-458")
                expect(result.body.neighborhood).toBe("Bairro Teste")
                expect(result.body.city).toBe("Cidade teste")
                expect(result.body.state).toBe("Estado teste")
                expect(result.body.country).toBe("Brasil")

            })
        })
    })
    //Fazer testes de quando o usuário já estiver registrado em userInfo
})