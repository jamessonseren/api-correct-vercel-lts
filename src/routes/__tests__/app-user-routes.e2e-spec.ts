import request from "supertest"
import { app } from "../../app"
import { InputCreateAppUserDTO } from "../../modules/AppUser/app-user-dto/app-user.dto"
import { InputCreateUserInfoDTO } from "../../modules/AppUser/AppUserManagement/usecases/UserInfo/create-user-info/dto/create-user-info.dto";
import { InputUpdateAppUserAddressDTO } from "../../modules/AppUser/AppUserManagement/usecases/UserAddress/update-app-user-address/dto/update-app-user-address.dto";
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

let userToken1: string;
let userToken2: string;
let userToken3: string


const inputNewAppUser1: InputCreateAppUserDTO = {
    user_info_uuid: null,
    document: '11234644053',
    email: 'email@email.com',
    password: 'senha123',
    is_active: true
}

const inputNewAppUser2: InputCreateAppUserDTO = {
    user_info_uuid: null,
    document: '283.330.980-53',
    email: 'email2@email.com',
    password: 'senha123',
    is_active: true
}

const inputNewAppUser3: InputCreateAppUserDTO = {
    user_info_uuid: null,
    document: '915.583.910-02',
    email: 'email3@email.com',
    password: 'senha123',
    is_active: true
}

const authenticateAppUser1 = {
    document: inputNewAppUser1.document,
    password: inputNewAppUser1.password
}

const authenticateAppUser2 = {
    document: inputNewAppUser2.document,
    password: inputNewAppUser2.password
}

const authenticateAppUser3 = {
    document: inputNewAppUser3.document,
    password: inputNewAppUser3.password
}

describe("E2E App User Auth tests", () => {

    describe("E2E App User Auth", () => {

        describe("Create app user", () => {


            it("Should throw an error if document is invalid", async () => {
                const inputNewAppUser12: InputCreateAppUserDTO = {
                    user_info_uuid: null,
                    document: '112346440535454',
                    email: 'email@email.com',
                    password: 'senha123',
                    is_active: true
                }
                const user2 = await request(app).post("/app-user").send(inputNewAppUser12)

                expect(user2.statusCode).toBe(400)
                expect(user2.body.error).toEqual("Document must have 11 characters")

            })
            it("Should throw an error if email is invalid", async () => {
                const inputNewAppUser12: InputCreateAppUserDTO = {
                    user_info_uuid: null,
                    document: '11234644053',
                    email: 'email.com',
                    password: 'senha123',
                    is_active: true
                }
                const user2 = await request(app).post("/app-user").send(inputNewAppUser12)

                expect(user2.statusCode).toBe(400)
                expect(user2.body.error).toEqual("Invalid email format")

            })


            it("Should create a new app user", async () => {

                const result = await request(app).post("/app-user").send(inputNewAppUser1)

                expect(result.statusCode).toBe(201)
                expect(result.body.document).toEqual(inputNewAppUser1.document)
                expect(result.body.email).toEqual(inputNewAppUser1.email)
                expect(result.body.is_active).toEqual(inputNewAppUser1.is_active)

            })
            it("Should throw an error if document is already registered", async () => {
                const inputNewAppUser12: InputCreateAppUserDTO = {
                    user_info_uuid: null,
                    document: '11234644053',
                    email: 'email@email.com',
                    password: 'senha123',
                    is_active: true
                }
                const user2 = await request(app).post("/app-user").send(inputNewAppUser12)

                expect(user2.statusCode).toBe(409)
                expect(user2.body.error).toEqual("User already has an account")

            })


            it("Should throw an error if email is already registered", async () => {
                const inputNewAppUser12: InputCreateAppUserDTO = {
                    user_info_uuid: null,
                    document: '40353978060',
                    email: 'email@email.com',
                    password: 'senha123',
                    is_active: true
                }
                const user2 = await request(app).post("/app-user").send(inputNewAppUser12)

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
                    password: inputNewAppUser1.password
                })
                expect(result.statusCode).toBe(401)
                expect(result.body.error).toBe("Document/password is incorrect")
            })

            it("Should throw an error if password is incorrect ", async () => {
                const result = await request(app).post("/login-app-user").send({
                    document: inputNewAppUser1.document,
                    password: 'inputNewAppUser1.password'
                })
                expect(result.statusCode).toBe(401)
                expect(result.body.error).toBe("Document/password is incorrect")
            })

            it("Should login app user with only number document", async () => {
                const result = await request(app).post("/login-app-user").send(authenticateAppUser1)

                userToken1 = result.body.token
                expect(result.statusCode).toBe(200)
            })
            it("Should login app user with full document", async () => {
                const input = {
                    document: '112.346.440-53',
                    password: authenticateAppUser1.password
                }

                const result = await request(app).post("/login-app-user").send(input)
                userToken1 = result.body.token
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
                    .set('Authorization', `Bearer ${userToken1}`)


                expect(result.statusCode).toBe(200)
                expect(result.body.status).toBeFalsy()
                expect(result.body.UserAuthDetails.document).toEqual(inputNewAppUser1.document)
                expect(result.body.UserAuthDetails.email).toEqual(inputNewAppUser1.email)
                expect(result.body.UserInfo).toBeFalsy()
                expect(result.body.UserAddress).toBeFalsy()
                expect(result.body.UserValidation).toBeFalsy()
            })

            

        })
    })

    describe("E2E App User Info", () => {

        describe("Create App User Info", () => {
            it("Should create a new user info", async () => {

                const input: InputCreateUserInfoDTO = {
                    business_info_uuid: null,
                    address_uuid: null,
                    document: null,
                    document2: null,
                    document3: null,
                    full_name: "User Full Name",
                    display_name: null,
                    internal_company_code: null,
                    gender: 'Male',
                    date_of_birth: '15/08/1998',
                    salary: null,
                    phone: null,
                    email: null,
                    company_owner: false,
                    status: null,
                    function: null,
                    recommendation_code: null,
                    is_authenticated: false,
                    marital_status: null,
                    dependents_quantity: 1,
                    user_document_validation_uuid: null,
                    user_id: null
                }


                const result = await request(app).post("/app-user/info").set('Authorization', `Bearer ${userToken1}`).send(input)
                const userDetails = await request(app)
                    .get("/app-user")
                    .set('Authorization', `Bearer ${userToken1}`)

                expect(result.statusCode).toBe(201)
                expect(result.body.sucess).toEqual("User info registered successfully")
                expect(userDetails.body.UserInfo).toBeTruthy()
            })
            it("Should throw an error if user info is already registered and tables are already synchronized", async () => {

                const input: InputCreateUserInfoDTO = {
                    business_info_uuid: null,
                    address_uuid: null,
                    document: null,
                    document2: null,
                    document3: null,
                    full_name: "User Full Name",
                    display_name: null,
                    internal_company_code: null,
                    gender: 'Male',
                    date_of_birth: '15/08/1998',
                    salary: null,
                    phone: null,
                    email: "email@email.com",
                    company_owner: false,
                    status: null,
                    function: null,
                    recommendation_code: null,
                    is_authenticated: false,
                    marital_status: null,
                    dependents_quantity: 1,
                    user_document_validation_uuid: null,
                    user_id: null
                }

                const createUser = await request(app).post("/app-user/info").set('Authorization', `Bearer ${userToken1}`).send(input)


                expect(createUser.body.error).toBe("User Info already registered - 1")
                expect(createUser.statusCode).toBe(409)
            })

            it("Should throw an error if user info is already registered and tables are not synchronized", async () => {
                //IMPORTANT: This test will happen when correct admin registers user info before user downloads the app.
                //When the user registers itself in userAuth table, the api will check if correct admin already created user info and will synchronize tables.
                //this test still need to be created


                // const inputNewAppUser1: InputCreateAppUserDTO = {
                //     user_info_uuid: null,
                //     document: '329.552.380-07',
                //     email: 'new-user@new-user.com',
                //     password: 'senha123',
                //     is_active: true
                // }
                // //create new user auth
                //  await request(app).post("/app-user").send(inputNewAppUser1)

                // //login user
                // const userLogin = {
                //     document: inputNewAppUser1.document,
                //     password: inputNewAppUser1.password
                // }
                // const loginUser = await request(app).post("/login-app-user").send(userLogin)
                // const userToken1New = loginUser.body.token

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
                //     date_of_birth: '15/08/1998',
                //     salary: null,
                //     phone: null,
                //     email: "email@email.com",
                //     company_owner: false,
                //     status: null,
                //     function: null,
                //     recommendation_code: null,
                //     is_authenticated: false,
                //     marital_status: null,
                //     dependents_quantity: 1,
                //     user_document_validation_uuid: null,
                //     user_id: null
                // }


                // const createUser = await request(app).post("/app-user/info").set('Authorization', `Bearer ${userToken1}`).send(input)


                // expect(createUser.body.error).toBe("User Info already registered - 1")
                // expect(createUser.statusCode).toBe(409)
            })

        })

        describe("Get User Info By User", () => {
            it("Should throw an error if document is missing", async () => {
                const input = {
                    document: ''
                }
                const result = await request(app).get("/app-user/info").set('Authorization', `Bearer ${userToken1}`).send(input)

                expect(result.body.error).toBe("Document is required")
                expect(result.statusCode).toBe(400)

            })

            it("Should throw an error if user info is not found", async () => {
                const input = {
                    document: '123.456.789-07'
                }
                const result = await request(app).get("/app-user/info").set('Authorization', `Bearer ${userToken1}`).send(input)

                expect(result.body.error).toBe("User info not found")
                expect(result.statusCode).toBe(404)

            })

            it("Should return user info", async () => {
                const input = {
                    document: '11234644053',
                }


                const result = await request(app).get("/app-user/info").set('Authorization', `Bearer ${userToken1}`).send(input)

                expect(result.body).toHaveProperty("uuid")
                expect(result.body.document).toBe(input.document)

            })
        })
    })
    describe("E2E test User Address", () => {
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

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input)

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

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input)

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


                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input)

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

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input)

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

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input)

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

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input)

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

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input)

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

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input);

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

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input);

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

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input);

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

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input);

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

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input);

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

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input);

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

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input);

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

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input);

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

                const result = await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input);
                const inputUserInfo = {
                    document: '11234644053',
                }

                const userInfo = await request(app).get("/app-user/info").set('Authorization', `Bearer ${userToken1}`).send(inputUserInfo)

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
                const result = await request(app).get("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input);

                expect(result.body.error).toBe("User document is required")
                expect(result.statusCode).toBe(400);

            })

            it("Should throw an error if user cannot be found by document", async () => {
                const input = {
                    document: '321564894518'
                }
                const result = await request(app).get("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(input);

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
                    date_of_birth: '15/08/1998',
                    salary: null,
                    phone: null,
                    email: "email-new@email.com",
                    company_owner: false,
                    status: null,
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
                const newuserToken1 = loginUser.body.token

                //create user info
                await request(app).post("/app-user/info").set('Authorization', `Bearer ${newuserToken1}`).send(inputCreateUserInfo)
                //find address
                const result = await request(app).get("/app-user/address").set('Authorization', `Bearer ${newuserToken1}`).send(inputGetUserAddress);

                expect(result.body.error).toBe("Unable to find user address")
                expect(result.statusCode).toBe(404);

            })

            it("Should return user Address", async () => {
                const inputUserAddress = {
                    document: '11234644053',
                }


                const result = await request(app).get("/app-user/address").set('Authorization', `Bearer ${userToken1}`).send(inputUserAddress);

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

        describe("Update user address", () => {

            it("Should throw an error if user info is not found", async () => {

                const inputAppUser: InputCreateAppUserDTO = {
                    user_info_uuid: null,
                    document: '777.690.850-98',
                    email: 'email-test2@email.com',
                    password: 'senha123',
                    is_active: true
                }

                const inputLoginUser = {
                    document: inputAppUser.document,
                    password: inputAppUser.password
                }

                const inputAddress: InputUpdateAppUserAddressDTO = {
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

                //create appuser
                await request(app).post("/app-user").send(inputAppUser)

                //login user
                const token = await request(app).post("/login-app-user").send(inputLoginUser)
                userToken2 = token.body.token

                const result = await request(app).put("/app-user/address").set('Authorization', `Bearer ${userToken2}`).send(inputAddress)

                expect(result.body.error).toBe("User info not found")
                expect(result.statusCode).toBe(404)
            })

            it("Should throw an error if address FK is null", async () => {

             
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
                    date_of_birth: '15/08/1998',
                    salary: null,
                    phone: null,
                    email: "email-new@email.com",
                    company_owner: false,
                    status: null,
                    function: null,
                    recommendation_code: null,
                    is_authenticated: false,
                    marital_status: null,
                    dependents_quantity: 1,
                    user_document_validation_uuid: null,
                    user_id: null
                }
                const inputAddress: InputUpdateAppUserAddressDTO = {
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


                //create user info
                await request(app).post("/app-user/info").set('Authorization', `Bearer ${userToken2}`).send(inputCreateUserInfo)

                const result = await request(app).put("/app-user/address").set('Authorization', `Bearer ${userToken2}`).send(inputAddress)

                expect(result.body.error).toBe("User address not found")
                expect(result.statusCode).toBe(404)

            })

            it("Should throw an error if user address is not found", async () => {



                const inputCreateUserInfo: InputCreateUserInfoDTO = {
                    business_info_uuid: null,
                    address_uuid: new Uuid("8c47d070-d708-4eb3-a981-f5fb69184c74"),
                    document: '630.996.530-12',
                    document2: null,
                    document3: null,
                    full_name: "User Full Name",
                    display_name: null,
                    internal_company_code: null,
                    gender: 'Male',
                    date_of_birth: '15/08/1998',
                    salary: null,
                    phone: null,
                    email: "email-new@email.com",
                    company_owner: false,
                    status: null,
                    function: null,
                    recommendation_code: null,
                    is_authenticated: false,
                    marital_status: null,
                    dependents_quantity: 1,
                    user_document_validation_uuid: null,
                    user_id: null
                }
                const inputAddress: InputUpdateAppUserAddressDTO = {
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


                //create user info
                await request(app).post("/app-user/info").set('Authorization', `Bearer ${userToken2}`).send(inputCreateUserInfo)

                const result = await request(app).put("/app-user/address").set('Authorization', `Bearer ${userToken2}`).send(inputAddress)

                expect(result.body.error).toBe("User address not found")
                expect(result.statusCode).toBe(404)

            })

            it("Should create user address", async () => {

                const inputAppUser: InputCreateAppUserDTO = {
                    user_info_uuid: null,
                    document: '777.690.850-98',
                    email: 'email-test2@email.com',
                    password: 'senha123',
                    is_active: true
                }

                const inputCreateUserInfo: InputCreateUserInfoDTO = {
                    business_info_uuid: null,
                    address_uuid: new Uuid("8c47d070-d708-4eb3-a981-f5fb69184c74"),
                    document: '630.996.530-12',
                    document2: null,
                    document3: null,
                    full_name: "User Full Name",
                    display_name: null,
                    internal_company_code: null,
                    gender: 'Male',
                    date_of_birth: '15/08/1998',
                    salary: null,
                    phone: null,
                    email: "email-new@email.com",
                    company_owner: false,
                    status: null,
                    function: null,
                    recommendation_code: null,
                    is_authenticated: false,
                    marital_status: null,
                    dependents_quantity: 1,
                    user_document_validation_uuid: null,
                    user_id: null
                }

                const inputCreateAddress = {
                    line1: "Rua teste",
                    line2: "41B",
                    line3: "",
                    postal_code: "02457-458",
                    neighborhood: "Bairro Teste",
                    city: "Cidade teste",
                    state: "Estado teste",
                    country: "Brasil",

                };

                await request(app).post("/app-user/address").set('Authorization', `Bearer ${userToken2}`).send(inputCreateAddress);

                const inputUpdateAddress: InputUpdateAppUserAddressDTO = {
                    line1: "Rua teste",
                    line2: "41B",
                    line3: "",
                    postal_code: "02457-458",
                    neighborhood: "Bairro Teste Novo",
                    city: "Cidade teste",
                    state: "Estado teste",
                    country: "País",
                    user_uuid: new Uuid("8c47d070-d708-4eb3-a981-f5fb69184c74")
                }

                //create appuser
                await request(app).post("/app-user").send(inputAppUser)

                //create user info
                await request(app).post("/app-user/info").set('Authorization', `Bearer ${userToken2}`).send(inputCreateUserInfo)

                const result = await request(app).put("/app-user/address").set('Authorization', `Bearer ${userToken2}`).send(inputUpdateAddress)

                expect(result.body.line1).toEqual(inputUpdateAddress.line1)
                expect(result.body.line2).toEqual(inputUpdateAddress.line2)
                expect(result.body.line3).toEqual(inputUpdateAddress.line3)
                expect(result.body.postal_code).toEqual(inputUpdateAddress.postal_code)
                expect(result.body.neighborhood).toEqual(inputUpdateAddress.neighborhood)
                expect(result.body.city).toEqual(inputUpdateAddress.city)
                expect(result.body.state).toEqual(inputUpdateAddress.state)
                expect(result.body.country).toEqual(inputUpdateAddress.country)

            })
        })
    })

    describe("E2E test Document Validation", () => {
        describe("Create document validation", () => {
            it("Should throw and error if user info is not found", async () => {
                //create user2
                await request(app).post("/app-user").send(inputNewAppUser2)
                //login user 2
                const token = await request(app).post("/login-app-user").send(authenticateAppUser2)
                userToken3 = token.body.token

                const input = {
                    selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
                    document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
                    document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
                    document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
                };

                const result = await request(app).post("/app-user/document-validation").set('Authorization', `Bearer ${userToken3}`).send(input)

                expect(result.statusCode).toBe(404)
                expect(result.body.error).toBe("User info not found")
            })

            it("Should throw an error if any document was not sent", async () => {
                //create user2
                await request(app).post("/app-user").send(inputNewAppUser2)

                //login user 2
                const token = await request(app).post("/login-app-user").send(authenticateAppUser2)
                userToken3 = token.body.token

                //create user info
                const inputCreateUserInfo: InputCreateUserInfoDTO = {
                    business_info_uuid: null,
                    address_uuid: null,
                    document: inputNewAppUser2.document,
                    document2: null,
                    document3: null,
                    full_name: "User Full Name",
                    display_name: null,
                    internal_company_code: null,
                    gender: 'Male',
                    date_of_birth: '15/08/1998',
                    salary: null,
                    phone: null,
                    email: inputNewAppUser2.email,
                    company_owner: false,
                    status: null,
                    function: null,
                    recommendation_code: null,
                    is_authenticated: false,
                    marital_status: null,
                    dependents_quantity: 1,
                    user_document_validation_uuid: null,
                    user_id: null
                }

                //create user info
                await request(app).post("/app-user/info").set('Authorization', `Bearer ${userToken3}`).send(inputCreateUserInfo)

                const input = {
                    selfie_base64: '',
                    document_front_base64: '',
                    document_back_base64: '',
                    document_selfie_base64: '',
                };

                const result = await request(app).post("/app-user/document-validation").set('Authorization', `Bearer ${userToken3}`).send(input)

                expect(result.statusCode).toBe(400)
                expect(result.body.error).toBe("No documents to be registered")
            })

            it("Should register one document", async () => {
                //create user2
                await request(app).post("/app-user").send(inputNewAppUser2)
                //login user 2
                const token = await request(app).post("/login-app-user").send(authenticateAppUser2)
                userToken3 = token.body.token

                const input = {
                    selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
                    document_front_base64: '',
                    document_back_base64: '',
                    document_selfie_base64: '',
                };

                const result = await request(app).post("/app-user/document-validation").set('Authorization', `Bearer ${userToken3}`).send(input)

                expect(result.statusCode).toBe(201)
                expect(result.body.result.selfie_status).toBe("under_analysis")
            })

            it("Should update documents", async () => {
                //create user2
                await request(app).post("/app-user").send(inputNewAppUser2)
                //login user 2
                const token = await request(app).post("/login-app-user").send(authenticateAppUser2)
                userToken3 = token.body.token

                const input = {
                    selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
                    document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
                    document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
                    document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
                };

                const result = await request(app).post("/app-user/document-validation").set('Authorization', `Bearer ${userToken3}`).send(input)

                expect(result.statusCode).toBe(201)
                expect(result.body.result.selfie_status).toBe("under_analysis")
                expect(result.body.result.document_front_status).toBe("under_analysis")
                expect(result.body.result.document_back_status).toBe("under_analysis")
                expect(result.body.result.document_selfie_status).toBe("under_analysis")
            })
        })
    })


    describe("E2E test User Status by document - Not authenticated", () => {
        it("Should return user with only user auth registered", async () => {

            //create app user
            await request(app).post("/app-user").send(inputNewAppUser3)

            const result = await request(app)
            .get(`/app-user/document/${inputNewAppUser3.document}`)
            
            expect(result.body.status).toBeFalsy()
            expect(result.body.UserAuth).toBeTruthy()
            expect(result.body.UserInfo).toBeFalsy()
            expect(result.body.Address).toBeFalsy()
            expect(result.body.UserValidation.document_front_status).toBe("pending to send")
            expect(result.body.UserValidation.document_back_status).toBe("pending to send")
            expect(result.body.UserValidation.document_selfie_status).toBe("pending to send")
            expect(result.body.UserValidation.selfie_status).toBe("pending to send")

        })

        it("Should return user with user auth and user info registered", async () => {

            const result = await request(app)
            .get(`/app-user/document/${inputNewAppUser2.document}`)

            expect(result.body.status).toBeFalsy()
            expect(result.body.UserAuth).toBeTruthy()
            expect(result.body.UserInfo).toBeTruthy()
            expect(result.body.Address).toBeFalsy()
            expect(result.body.UserValidation.document_front_status).toBe("pending to send")
            expect(result.body.UserValidation.document_back_status).toBe("pending to send")
            expect(result.body.UserValidation.document_selfie_status).toBe("pending to send")
            expect(result.body.UserValidation.selfie_status).toBe("pending to send")

        })

        
        it("Should return user with user auth, user info, and address registered", async () => {

            const result = await request(app)
            .get(`/app-user/document/${inputNewAppUser1.document}`)

            expect(result.body.status).toBeFalsy()
            expect(result.body.UserAuth).toBeTruthy()
            expect(result.body.UserInfo).toBeTruthy()
            expect(result.body.Address).toBeTruthy()
            expect(result.body.UserValidation.document_front_status).toBe("pending to send")
            expect(result.body.UserValidation.document_back_status).toBe("pending to send")
            expect(result.body.UserValidation.document_selfie_status).toBe("pending to send")
            expect(result.body.UserValidation.selfie_status).toBe("pending to send")

        })


        it("Should return a user with full status", async () => {

            const token = await request(app).post("/login-app-user").send(authenticateAppUser1)
            const userToken = token.body.token
            const input = {
                selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
                document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
                document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
                document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            };

             await request(app).post("/app-user/document-validation").set('Authorization', `Bearer ${userToken}`).send(input)

            const result = await request(app)
            .get(`/app-user/document/${inputNewAppUser1.document}`)

            expect(result.body.status).toBeTruthy()
            expect(result.body.UserAuth).toBeTruthy()
            expect(result.body.UserInfo).toBeTruthy()
            expect(result.body.Address).toBeTruthy()
            expect(result.body.UserValidation.document_front_status).toBe("under_analysis")
            expect(result.body.UserValidation.document_back_status).toBe("under_analysis")
            expect(result.body.UserValidation.document_selfie_status).toBe("under_analysis")
            expect(result.body.UserValidation.selfie_status).toBe("under_analysis")

        })
    })
   
    //Fazer testes de quando o usuário já estiver registrado em userInfo
})