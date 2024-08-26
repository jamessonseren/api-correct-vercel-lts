import request from 'supertest'
import { app } from '../../app'

let correctAdminToken: string
let business_info_uuid: string
let business_address_uuid: string

let business_user_token: string
let business_admin_uuid: string
let company_user_uuid: string
describe("E2E Business tests", () => {
  beforeAll(async () => {

    const inputNewAdmin = {
      name: "Admin Correct",
      email: "admincorrect@correct.com.br",
      userName: "admin-correct",
      password: "123"
    }
    //create correct admin
    await request(app).post('/admin').send(inputNewAdmin)

    const authenticateAdmin = {
      userName: inputNewAdmin.userName,
      password: inputNewAdmin.password
    }
    //authenticate correct admin
    const result = await request(app).post('/login').send(authenticateAdmin)
    correctAdminToken = result.body.token
  })

  describe("Business First Register", () => {

    it("Should throw an error if line1 is missing", async () => {
      const input = {
        line1: "",
        line2: "72B",
        line3: "Complemento",
        neighborhood: "Bairro Teste",
        postal_code: "731547854",
        city: "Cidade teste",
        state: "Estado teste",
        country: "País teste",
        fantasy_name: "Empresa teste",
        document: "CNPJ",
        classification: "Classificação",
        colaborators_number: 5,
        email: "email@email.com",
        phone_1: "7287569874",
        phone_2: "124588965",
        business_type: "empregador"
      }

      const result = await request(app).post("/business/register").send(input)

      expect(result.statusCode).toBe(400)
      expect(result.body.error).toBe("Street is required")

    })


    it("Should throw an error if line2 is missing", async () => {
      const input = {
        line1: "Rua",
        line2: "",
        line3: "Complemento",
        neighborhood: "Bairro Teste",
        postal_code: "731547854",
        city: "Cidade teste",
        state: "Estado teste",
        country: "País teste",
        fantasy_name: "Empresa teste",
        document: "CNPJ",
        classification: "Classificação",
        colaborators_number: 5,
        email: "email@email.com",
        phone_1: "7287569874",
        phone_2: "124588965",
        business_type: "empregador"
      }

      const result = await request(app).post("/business/register").send(input)

      expect(result.statusCode).toBe(400)
      expect(result.body.error).toBe("Number is required")

    })

    it("Should throw an error if neighbor is missing", async () => {
      const input = {
        line1: "Rua",
        line2: "72B",
        line3: "Complemento",
        neighborhood: "",
        postal_code: "731547854",
        city: "Cidade teste",
        state: "Estado teste",
        country: "País teste",
        fantasy_name: "Empresa teste",
        document: "CNPJ",
        classification: "Classificação",
        colaborators_number: 5,
        email: "email@email.com",
        phone_1: "7287569874",
        phone_2: "124588965",
        business_type: "empregador"
      }

      const result = await request(app).post("/business/register").send(input)

      expect(result.statusCode).toBe(400)
      expect(result.body.error).toBe("Neighborhood is required")

    })

    it("Should throw an error if postal code is missing", async () => {
      const input = {
        line1: "Rua",
        line2: "72B",
        line3: "",
        neighborhood: "Bairro Teste",
        postal_code: "",
        city: "Cidade teste",
        state: "Estado teste",
        country: "País teste",
        fantasy_name: "Empresa teste",
        document: "CNPJ",
        classification: "Classificação",
        colaborators_number: 5,
        email: "email@email.com",
        phone_1: "7287569874",
        phone_2: "124588965",
        business_type: "empregador"
      }

      const result = await request(app).post("/business/register").send(input)

      expect(result.statusCode).toBe(400)
      expect(result.body.error).toBe("Zip Code is required")

    })

    it("Should throw an error if city is missing", async () => {
      const input = {
        line1: "Rua",
        line2: "72B",
        line3: "",
        neighborhood: "Bairro Teste",
        postal_code: "5484248423",
        city: "",
        state: "Estado teste",
        country: "País teste",
        fantasy_name: "Empresa teste",
        document: "CNPJ",
        classification: "Classificação",
        colaborators_number: 5,
        email: "email@email.com",
        phone_1: "7287569874",
        phone_2: "124588965",
        business_type: "empregador"
      }

      const result = await request(app).post("/business/register").send(input)

      expect(result.statusCode).toBe(400)
      expect(result.body.error).toBe("City is required")

    })

    it("Should throw an error if state is missing", async () => {
      const input = {
        line1: "Rua",
        line2: "72B",
        line3: "",
        neighborhood: "Bairro Teste",
        postal_code: "5484248423",
        city: "Cidade teste",
        state: "",
        country: "País teste",
        fantasy_name: "Empresa teste",
        document: "CNPJ",
        classification: "Classificação",
        colaborators_number: 5,
        email: "email@email.com",
        phone_1: "7287569874",
        phone_2: "124588965",
        business_type: "empregador"
      }

      const result = await request(app).post("/business/register").send(input)

      expect(result.statusCode).toBe(400)
      expect(result.body.error).toBe("State is required")

    })

    it("Should throw an error if country is missing", async () => {
      const input = {
        line1: "Rua",
        line2: "72B",
        line3: "",
        neighborhood: "Bairro Teste",
        postal_code: "5484248423",
        city: "Cidade teste",
        state: "Estado teste",
        country: "",
        fantasy_name: "Empresa teste",
        document: "CNPJ",
        classification: "Classificação",
        colaborators_number: 5,
        email: "email@email.com",
        phone_1: "7287569874",
        phone_2: "124588965",
        business_type: "empregador"
      }

      const result = await request(app).post("/business/register").send(input)

      expect(result.statusCode).toBe(400)
      expect(result.body.error).toBe("Country is required")

    })

    it("Should throw an error if fantasy_name is missing", async () => {
      const input = {
        line1: "Rua",
        line2: "72B",
        line3: "",
        neighborhood: "Bairro Teste",
        postal_code: "5484248423",
        city: "Cidade teste",
        state: "Estado teste",
        country: "País teste",
        fantasy_name: "",
        document: "CNPJ",
        classification: "Classificação",
        colaborators_number: 5,
        email: "email@email.com",
        phone_1: "7287569874",
        phone_2: "124588965",
        business_type: "empregador"
      }

      const result = await request(app).post("/business/register").send(input)

      expect(result.statusCode).toBe(400)
      expect(result.body.error).toBe("Fantasy name is required")

    })

    it("Should throw an error if document is missing", async () => {
      const input = {
        line1: "Rua",
        line2: "72B",
        line3: "",
        neighborhood: "Bairro Teste",
        postal_code: "5484248423",
        city: "Cidade teste",
        state: "Estado teste",
        country: "País teste",
        fantasy_name: "Empresa teste",
        document: "",
        classification: "Classificação",
        colaborators_number: 5,
        email: "email@email.com",
        phone_1: "7287569874",
        phone_2: "124588965",
        business_type: "empregador"
      }

      const result = await request(app).post("/business/register").send(input)

      expect(result.statusCode).toBe(400)
      expect(result.body.error).toBe("Document is required")

    })

    it("Should throw an error if classification is missing", async () => {
      const input = {
        line1: "Rua",
        line2: "72B",
        line3: "",
        neighborhood: "Bairro Teste",
        postal_code: "5484248423",
        city: "Cidade teste",
        state: "Estado teste",
        country: "País teste",
        fantasy_name: "Empresa teste",
        document: "CNPJ",
        classification: "",
        colaborators_number: 5,
        email: "email@email.com",
        phone_1: "7287569874",
        phone_2: "124588965",
        business_type: "empregador"
      }

      const result = await request(app).post("/business/register").send(input)

      expect(result.statusCode).toBe(400)
      expect(result.body.error).toBe("Company classification is required")

    })

    it("Should throw an error if colaborators is missing", async () => {
      const input = {
        line1: "Rua",
        line2: "72B",
        line3: "",
        neighborhood: "Bairro Teste",
        postal_code: "5484248423",
        city: "Cidade teste",
        state: "Estado teste",
        country: "País teste",
        fantasy_name: "Empresa teste",
        document: "CNPJ",
        classification: "Classificação",
        colaborators_number: 0,
        email: "email@email.com",
        phone_1: "7287569874",
        phone_2: "124588965",
        business_type: "empregador"
      }

      const result = await request(app).post("/business/register").send(input)

      expect(result.statusCode).toBe(400)
      expect(result.body.error).toBe("Total employees is required")

    })

    it("Should throw an error if email is missing", async () => {
      const input = {
        line1: "Rua",
        line2: "72B",
        line3: "",
        neighborhood: "Bairro Teste",
        postal_code: "5484248423",
        city: "Cidade teste",
        state: "Estado teste",
        country: "País teste",
        fantasy_name: "Empresa teste",
        document: "CNPJ",
        classification: "Classificação",
        colaborators_number: 5,
        email: "",
        phone_1: "7287569874",
        phone_2: "124588965",
        business_type: "empregador"
      }

      const result = await request(app).post("/business/register").send(input)

      expect(result.statusCode).toBe(400)
      expect(result.body.error).toBe("Email is required")

    })

    it("Should throw an error if phone 1 is missing", async () => {
      const input = {
        line1: "Rua",
        line2: "72B",
        line3: "",
        neighborhood: "Bairro Teste",
        postal_code: "5484248423",
        city: "Cidade teste",
        state: "Estado teste",
        country: "País teste",
        fantasy_name: "Empresa teste",
        document: "CNPJ",
        classification: "Classificação",
        colaborators_number: 5,
        email: "email@email.com",
        phone_1: "",
        phone_2: "124588965",
        business_type: "empregador"
      }

      const result = await request(app).post("/business/register").send(input)

      expect(result.statusCode).toBe(400)
      expect(result.body.error).toBe("Telephone 1 is required")

    })

    it("Should throw an error if business type is missing", async () => {
      const input = {
        line1: "Rua",
        line2: "72B",
        line3: "",
        neighborhood: "Bairro Teste",
        postal_code: "5484248423",
        city: "Cidade teste",
        state: "Estado teste",
        country: "País teste",
        fantasy_name: "Empresa teste",
        document: "CNPJ",
        classification: "Classificação",
        colaborators_number: 5,
        email: "email@email.com",
        phone_1: "215745158",
        phone_2: "124588965",
        business_type: ""
      }

      const result = await request(app).post("/business/register").send(input)

      expect(result.statusCode).toBe(400)
      expect(result.body.error).toBe("Business type is required")

    })

    it("Should register a new business", async () => {
      const input = {
        line1: "Rua",
        line2: "72B",
        line3: "",
        neighborhood: "Bairro Teste",
        postal_code: "5484248423",
        city: "Cidade teste",
        state: "Estado teste",
        country: "País teste",
        fantasy_name: "Empresa teste",
        document: "CNPJ",
        classification: "Classificação",
        colaborators_number: 5,
        email: "email@email.com",
        phone_1: "215745158",
        phone_2: "124588965",
        business_type: "empregador"
      }

      const result = await request(app).post("/business/register").send(input)
      business_info_uuid = result.body.business_info_uuid
      business_address_uuid = result.body.address_uuid

      expect(result.statusCode).toBe(201)
      expect(result.body.line1).toBe(input.line1)
      expect(result.body.line2).toBe(input.line2)
      expect(result.body.line3).toBe(input.line3)
      expect(result.body.neighborhood).toBe(input.neighborhood)
      expect(result.body.postal_code).toBe(input.postal_code)
      expect(result.body.city).toBe(input.city)
      expect(result.body.state).toBe(input.state)
      expect(result.body.country).toBe(input.country)
      expect(result.body.business_info_uuid).toBeTruthy()
      expect(result.body.fantasy_name).toBe(input.fantasy_name)
      expect(result.body.document).toBe(input.document)
      expect(result.body.classification).toBe(input.classification)
      expect(result.body.colaborators_number).toBe(input.colaborators_number)
      expect(result.body.status).toBe("pending_approval")
      expect(result.body.email).toBe(input.email)
      expect(result.body.phone_1).toBe(input.phone_1)
      expect(result.body.phone_2).toBe(input.phone_2)
      expect(result.body.business_type).toBe(input.business_type)
      expect(result.body.address_uuid).toEqual(result.body.address_fk_uuid)
    })

    it("Should throw an error if business is already registeres", async () => {
      const input = {
        line1: "Rua",
        line2: "72B",
        line3: "",
        neighborhood: "Bairro Teste",
        postal_code: "5484248423",
        city: "Cidade teste",
        state: "Estado teste",
        country: "País teste",
        fantasy_name: "Empresa teste",
        document: "CNPJ",
        classification: "Classificação",
        colaborators_number: 5,
        email: "email@email.com",
        phone_1: "215745158",
        phone_2: "124588965",
        business_type: "empregador"
      }

      const input2 = {
        line1: "Rua",
        line2: "72B",
        line3: "",
        neighborhood: "Bairro Teste",
        postal_code: "5484248423",
        city: "Cidade teste",
        state: "Estado teste",
        country: "País teste",
        fantasy_name: "Empresa teste",
        document: "CNPJ",
        classification: "Classificação",
        colaborators_number: 5,
        email: "email@email.com",
        phone_1: "215745158",
        phone_2: "124588965",
        business_type: "empregador"
      }
      await request(app).post("/business/register").send(input)
      const result = await request(app).post("/business/register").send(input2)

      expect(result.statusCode).toBe(409)
      expect(result.body.error).toBe("Business already registered")

    })
  })
  describe("Business data", () => {
    describe("Update Business data by correct", () => {
      it("Should throw an error if business id is missing", async () => {
        const input = {
          address_uuid: "123",
          fantasy_name: "Empresa teste",
          document: "CNPJ",
          classification: "Classificação",
          status: "pending_approval",
          colaborators_number: 5,
          email: "email@email.com",
          phone_1: "215745158",
          phone_2: "124588965",
          business_type: "empregador"
        }
        const result = await request(app).put("/business/info/correct").set('Authorization', `Bearer ${correctAdminToken}`).send(input)
        expect(result.statusCode).toBe(400)
        expect(result.body.error).toBe("Business info Id is required")
      })

      it("Should throw an error if business info was not found", async () => {
        const input = {
          address_uuid: "123",
          fantasy_name: "Empresa teste",
          document: "CNPJ",
          classification: "Classificação",
          status: "pending_approval",
          colaborators_number: 5,
          email: "email@email.com",
          phone_1: "215745158",
          phone_2: "124588965",
          business_type: "empregador"
        }

        const query = {
          business_info_uuid: "1"
        }
        const result = await request(app).put("/business/info/correct").set('Authorization', `Bearer ${correctAdminToken}`).query(query).send(input)
        expect(result.statusCode).toBe(404)
        expect(result.body.error).toBe("Business info not found")
      })

      it("Should update business data by correct admin", async () => {
        const input = {
          address_uuid: business_address_uuid,
          fantasy_name: "Empresa novo nome",
          document: "CNPJ",
          classification: "Classificação",
          colaborators_number: 5,
          email: "email@email.com",
          phone_1: "215745158",
          phone_2: "124588965",
          business_type: "empregador"
        }

        const query = {
          business_info_uuid: business_info_uuid
        }
        const result = await request(app).put("/business/info/correct").set('Authorization', `Bearer ${correctAdminToken}`).query(query).send(input)
        expect(result.statusCode).toBe(200)
        expect(result.body.address_uuid).toEqual(business_address_uuid)
        expect(result.body.fantasy_name).toBe(input.fantasy_name)
        expect(result.body.status).toBe("pending_approval")
        expect(result.body.document).toBe(input.document)
        expect(result.body.email).toBe(input.email)
        expect(result.body.phone_1).toBe(input.phone_1)
        expect(result.body.phone_2).toBe(input.phone_2)
        expect(result.body.business_type).toBe(input.business_type)

      })
    })
  })
  describe("Business User", () => {
    describe("E2E Create Business admin by correct admin", () => {
      it("Should throw an error if password is missing", async () => {
        const input = {
          password: "",
          business_info_uuid,
        }
        const result = await request(app).post("/business/admin/correct").set('Authorization', `Bearer ${correctAdminToken}`).send(input)

        expect(result.statusCode).toBe(400)
        expect(result.body.error).toBe("Password is required")
      })

      it("Should throw an error if business info is missing", async () => {
        const input = {
          password: "123456",
          business_info_uuid: ""
        }
        const result = await request(app).post("/business/admin/correct").set('Authorization', `Bearer ${correctAdminToken}`).send(input)

        expect(result.statusCode).toBe(400)
        expect(result.body.error).toBe("Business info is required")
      })

      it("Should throw an error if email is missing", async () => {
        const input = {
          password: "123456",
          business_info_uuid
        }
        const result = await request(app).post("/business/admin/correct").set('Authorization', `Bearer ${correctAdminToken}`).send(input)

        expect(result.statusCode).toBe(400)
        expect(result.body.error).toBe("Email is required")
      })

      it("Should throw an error if email is not found in company registeres", async () => {
        const input = {
          password: "123456",
          business_info_uuid,
          email: "differentemail@email.com"
        }
        const result = await request(app).post("/business/admin/correct").set('Authorization', `Bearer ${correctAdminToken}`).send(input)

        expect(result.statusCode).toBe(400)
        expect(result.body.error).toBe("Email not found in company registers")
      })

      it("Should throw an error if business is still not validated by correct", async () => {
        const input = {
          password: "123456",
          business_info_uuid,
          email: "email@email.com"
        }
        const result = await request(app).post("/business/admin/correct").set('Authorization', `Bearer ${correctAdminToken}`).send(input)

        expect(result.statusCode).toBe(401)
        expect(result.body.error).toBe("Business must be validated before creating an Admin user")
      })

      it("Should throw an error if business is inactive", async () => {
        //inactive business
        const inputToInactivate = {
          address_uuid: business_address_uuid,
          fantasy_name: "Empresa novo nome",
          document: "CNPJ",
          classification: "Classificação",
          colaborators_number: 5,
          email: "email@email.com",
          phone_1: "215745158",
          phone_2: "124588965",
          business_type: "empregador",
          status: "inactive"
        }
        const query = {
          business_info_uuid: business_info_uuid
        }
        await request(app).put("/business/info/correct").set('Authorization', `Bearer ${correctAdminToken}`).query(query).send(inputToInactivate)

        const input = {
          password: "123456",
          business_info_uuid,
          email: "email@email.com"
        }
        const result = await request(app).post("/business/admin/correct").set('Authorization', `Bearer ${correctAdminToken}`).send(input)

        expect(result.statusCode).toBe(401)
        expect(result.body.error).toBe("Business has inactive status")
      })

      it("Should create business user", async () => {
        //activate business
        const inputToInactivate = {
          address_uuid: business_address_uuid,
          fantasy_name: "Empresa novo nome",
          document: "CNPJ",
          classification: "Classificação",
          colaborators_number: 5,
          email: "email@email.com",
          phone_1: "215745158",
          phone_2: "124588965",
          business_type: "empregador",
          status: "active"
        }
        const query = {
          business_info_uuid: business_info_uuid
        }
        await request(app).put("/business/info/correct").set('Authorization', `Bearer ${correctAdminToken}`).query(query).send(inputToInactivate)

        const input = {
          password: "123456",
          business_info_uuid,
          email: "email@email.com"
        }
        const result = await request(app).post("/business/admin/correct").set('Authorization', `Bearer ${correctAdminToken}`).send(input)

        business_admin_uuid = result.body.uuid
        expect(result.statusCode).toBe(201)
        expect(result.body.uuid).toBeTruthy()
        expect(result.body.business_info_uuid).toBe(business_info_uuid)
        expect(result.body.email).toBe(input.email)
        expect(result.body.document).toBeFalsy()
        expect(result.body.is_admin).toBe(true)
        expect(result.body.permissions).toEqual(["all"])
        expect(result.body.user_name).toBeFalsy()
        expect(result.body.function).toBeFalsy()
        expect(result.body.status).toBe('pending_password')
      })

      it("Should throw an error if email is already registered", async () => {

        const input = {
          password: "123456",
          business_info_uuid,
          email: "email@email.com"
        }
        const result = await request(app).post("/business/admin/correct").set('Authorization', `Bearer ${correctAdminToken}`).send(input)

        expect(result.statusCode).toBe(409)
        expect(result.body.error).toBe("Email already registered")
      })
    })

    describe("E2E Authenticate business user/admin", () => {
      it("Should throw an error if user business document is missing", async () => {
        const input = {
          business_document: "",
          password: "123456"
        }

        const result = await request(app).post("/business/admin/login").send(input)
        expect(result.statusCode).toBe(401)
        expect(result.body.error).toBe("Incorrect credentials")
      })

      it("Should throw an error if user password is missing", async () => {
        const input = {
          business_document: "CNPJ",
          password: ""
        }

        const result = await request(app).post("/business/admin/login").send(input)
        expect(result.statusCode).toBe(401)
        expect(result.body.error).toBe("Incorrect credentials")
      })

      it("Should throw an error if business document does not exist", async () => {
        const input = {
          business_document: "Wrong document",
          password: "123456"
        }

        const result = await request(app).post("/business/admin/login").send(input)
        expect(result.statusCode).toBe(401)
        expect(result.body.error).toBe("Incorrect credentials")
      })

      it("Should throw an error if trying to login with wrong email", async () => {
        const input = {
          business_document: "CNPJ",
          password: "123456",
          email: "wrongemail@wrongemail.com"
        }

        const result = await request(app).post("/business/admin/login").send(input)
        expect(result.statusCode).toBe(401)
        expect(result.body.error).toBe("Incorrect credentials")
      })

      it("Should throw an error if trying to login with right email and wrong password", async () => {
        const input = {
          business_document: "CNPJ",
          password: "9847878",
          email: "email@email.com"
        }

        const result = await request(app).post("/business/admin/login").send(input)
        expect(result.statusCode).toBe(401)
        expect(result.body.error).toBe("Incorrect credentials")
      })

      it("Should login user", async () => {
        const input = {
          business_document: "CNPJ",
          password: "123456",
          email: "email@email.com"
        }

        const result = await request(app).post("/business/admin/login").send(input)
        business_user_token = result.body.token

        expect(result.statusCode).toBe(200)
        expect(result.body.token).toBeTruthy()
      })


      it("Should throw an error if trying to login with username and it's missing", async () => {
        const input = {
          business_document: "CNPJ",
          password: "9847878",
          user_name: ""
        }

        const result = await request(app).post("/business/admin/login").send(input)
        expect(result.statusCode).toBe(401)
        expect(result.body.error).toBe("Incorrect credentials")
      })

      it("Should throw an error if trying to login with username and it does not exist", async () => {
        const input = {
          business_document: "CNPJ",
          password: "9847878",
          user_name: "any"
        }

        const result = await request(app).post("/business/admin/login").send(input)
        expect(result.statusCode).toBe(401)
        expect(result.body.error).toBe("Incorrect credentials")
      })

    })

    describe("E2E Update Business admin/user by business admin ", () => {
      it("Should throw an error if id is missing", async () => {
        const input = {

        }

        const query = {
          business_info_uuid: ""
        }

        const result = await request(app).patch("/company-user").set('Authorization', `Bearer ${business_user_token}`).query(query).send(input)
        expect(result.statusCode).toBe(400)
        expect(result.body.error).toBe('User ID is required')
      })

      it("Should throw an error if id does not exist", async () => {
        const input = {

        }

        const query = {
          user_id: "1"
        }

        const result = await request(app).patch("/company-user").set('Authorization', `Bearer ${business_user_token}`).query(query).send(input)
        expect(result.statusCode).toBe(404)
        expect(result.body.error).toBe('User not found')

      })

      it("Should throw an error trying to do something with old password", async () => {
        const input = {
          user_name: "123456"
        }

        const query = {
          user_id: business_admin_uuid
        }
        const result = await request(app).patch("/company-user").set('Authorization', `Bearer ${business_user_token}`).query(query).send(input)

        expect(result.statusCode).toBe(400)
        expect(result.body.error).toBe('Password must be updated')

      })

      it("Should throw an error if business admin does not have document", async () => {
        const input = {
          password: "123456"
        }

        const query = {
          user_id: business_admin_uuid
        }
        const result = await request(app).patch("/company-user").set('Authorization', `Bearer ${business_user_token}`).query(query).send(input)

        expect(result.statusCode).toBe(400)
        expect(result.body.error).toBe('Document is required')

      })

      it("Should throw an error new password is same as old one", async () => {
        const input = {
          password: "123456",
          document: '1365498489'
        }

        const query = {
          user_id: business_admin_uuid
        }
        const result = await request(app).patch("/company-user").set('Authorization', `Bearer ${business_user_token}`).query(query).send(input)
        expect(result.statusCode).toBe(409)
        expect(result.body.error).toBe('Password must not be the same')

      })

      it("Should update business admin", async () => {
        const input = {
          document: "123456",
          password: "12398754"
        }

        const query = {
          user_id: business_admin_uuid
        }
        const result = await request(app).patch("/company-user").set('Authorization', `Bearer ${business_user_token}`).query(query).send(input)

        expect(result.statusCode).toBe(200)

      })
    })

    describe("E2E Create business user by business admin", () => {


      it("Should throw an error if user name is missing", async () => {
        const input = {
          password: "1345687",
          business_info_uuid,
          user_name: ""
        }
        const result = await request(app).post("/business/admin/register/user").set('Authorization', `Bearer ${business_user_token}`).send(input)
        expect(result.statusCode).toBe(400)
        expect(result.body.error).toBe('User name is required')
      })

      it("Should register a new user", async () => {
        const input = {
          password: "1345687",
          business_info_uuid,
          user_name: 'user_name',
          permissions: ['finances']
        }
        const result = await request(app).post("/business/admin/register/user").set('Authorization', `Bearer ${business_user_token}`).send(input)
        company_user_uuid = result.body.uuid
        expect(result.statusCode).toBe(201)
        expect(result.body.uuid).toBeTruthy()
        expect(result.body.business_info_uuid).toBe(input.business_info_uuid)
        expect(result.body.email).toBeFalsy()
        expect(result.body.document).toBeFalsy()
        expect(result.body.is_admin).toBeFalsy()
        expect(result.body.permissions).toEqual(input.permissions)
        expect(result.body.user_name).toEqual(input.user_name)
        expect(result.body.funtion).toBeFalsy()
        expect(result.body.status).toBe('active')

      })

      it("Should throw an error if user name already exists", async () => {
        const input = {
          password: "1345687",
          business_info_uuid,
          user_name: 'user_name',
          permissions: ['finances']
        }
        const result = await request(app).post("/business/admin/register/user").set('Authorization', `Bearer ${business_user_token}`).send(input)
        expect(result.statusCode).toBe(409)
        expect(result.body.error).toBe('User name already registered')
      })
    })

    describe("E2E Get single user by admin", () => {
      it("Should throw an error if id is missing", async () => {
        const result = await request(app).get("/business/admin/details/user").set('Authorization', `Bearer ${business_user_token}`).query({ user_uuid: '' })

        expect(result.statusCode).toBe(400)
        expect(result.body.error).toBe("Id is required")
      })

      it("Should throw an error if user cannot be found", async () => {
        const result = await request(app).get("/business/admin/details/user").set('Authorization', `Bearer ${business_user_token}`).query({ user_uuid: '1' })

        expect(result.statusCode).toBe(404)
        expect(result.body.error).toBe("User not found")
      })

      it("Should return user details", async () => {
        const result = await request(app).get("/business/admin/details/user").set('Authorization', `Bearer ${business_user_token}`).query({ user_uuid: company_user_uuid })
        expect(result.statusCode).toBe(200)
        expect(result.body.uuid).toEqual(company_user_uuid)
        expect(result.body.business_info_uuid).toEqual(business_info_uuid)
      })
    })

    describe("E2E Get all users by admin", () => {
      beforeAll(async () => {
        const input1 = {
          password: "1345687",
          business_info_uuid,
          user_name: 'user_name2',
          permissions: ['finances']
        }
        const input2 = {
          password: "1345687",
          business_info_uuid,
          user_name: 'user_name3',
          permissions: ['finances']
        }
        await request(app).post("/business/admin/register/user").set('Authorization', `Bearer ${business_user_token}`).send(input1)
        await request(app).post("/business/admin/register/user").set('Authorization', `Bearer ${business_user_token}`).send(input2)
      })

      it("Should return users", async () => {
        const result = await request(app).get("/company-users").set('Authorization', `Bearer ${business_user_token}`)
        expect(result.statusCode).toBe(200)
        expect(result.body.length).toBe(3)
      })
    })

    describe("E2E Delete user by admin", () => {
      it("Should throw an error if user id is missing", async () => {
        const result = await request(app).patch("/company-user/delete").set('Authorization', `Bearer ${business_user_token}`).query({ user_id: '' })
        expect(result.statusCode).toBe(400)
        expect(result.body.error).toBe("User id is required")

      })

      it("Should throw an error if user is not found", async () => {
        const result = await request(app).patch("/company-user/delete").set('Authorization', `Bearer ${business_user_token}`).query({ user_id: '12345' })
        expect(result.statusCode).toBe(404)
        expect(result.body.error).toBe("User not found")

      })


      it("Should delete an user", async () => {
        const result = await request(app).patch("/company-user/delete").set('Authorization', `Bearer ${business_user_token}`).query({ user_id: company_user_uuid })
        expect(result.statusCode).toBe(200)
        expect(result.body.message).toBe("Usuário excluído com sucesso")

      })
    })

    describe("E2E Confirm password by business admin", () => {
      it("Should throw an error if password is missing", async () => {

        const input = {
          password: ''
        }
        const result = await request(app).post("/confirm-password").set('Authorization', `Bearer ${business_user_token}`).send(input)

        expect(result.statusCode).toBe(400)
        expect(result.body.error).toBe("Incorrect credentials")
      })

      it("Should throw an error if password is incorrect", async () => {

        const input = {
          password: '16548'
        }
        const result = await request(app).post("/confirm-password").set('Authorization', `Bearer ${business_user_token}`).send(input)

        expect(result.statusCode).toBe(403)
        expect(result.body.error).toBe("Incorrect credentials")
      })

      it("Should confirm password", async () => {

        const input = {
          password: '12398754'
        }
        const result = await request(app).post("/confirm-password").set('Authorization', `Bearer ${business_user_token}`).send(input)

        expect(result.statusCode).toBe(200)
        expect(result.body.message).toBe("Password matches")
      })
    })
  })

  describe("Business Data by Business admin", () => {
    describe("E2E Get Business data by business admin", () => {
      it("Should return business data", async () => {
        const result = await request(app).get("/business/info").set('Authorization', `Bearer ${business_user_token}`)
        business_info_uuid = result.body.uuid
        expect(result.statusCode).toBe(200)
      })
    })
    describe("E2E update business data by business admin", () => {
      it("Should throw an error if id is missing", async () => {

        const input = {
          address_uuid: "123",
          fantasy_name: "Atualizado pelo admin",
          document: "CNPJ",
          classification: "Classificação",
          colaborators_number: 5,
          email: "email@email.com",
          phone_1: "64684984654",
          phone_2: "124588965",
          business_type: "empregador"
        }
        const query = {
          business_info_uuid: ''
        }
        const result = await request(app).put("/business/info/company").set('Authorization', `Bearer ${business_user_token}`).query(query).send(input)
        expect(result.statusCode).toBe(400)
        expect(result.body.error).toBe("Business info Id is required")
      })
      it("Should throw an error if id is missing", async () => {

        const input = {
          address_uuid: "123",
          fantasy_name: "Atualizado pelo admin",
          document: "CNPJ",
          classification: "Classificação",
          colaborators_number: 5,
          email: "email@email.com",
          phone_1: "64684984654",
          phone_2: "124588965",
          business_type: "empregador"
        }
        const query = {
          business_info_uuid: '123'
        }
        const result = await request(app).put("/business/info/company").set('Authorization', `Bearer ${business_user_token}`).query(query).send(input)
        expect(result.statusCode).toBe(404)
        expect(result.body.error).toBe("Business info not found")
      })
      it("Should update business data", async () => {

        const input = {
          address_uuid: "123",
          fantasy_name: "Atualizado pelo admin",
          document: "CNPJ",
          classification: "Classificação",
          colaborators_number: 5,
          email: "email@email.com",
          phone_1: "64684984654",
          phone_2: "124588965",
          business_type: "empregador"
        }
        const query = {
          business_info_uuid: business_info_uuid
        }
        const result = await request(app).put("/business/info/company").set('Authorization', `Bearer ${business_user_token}`).query(query).send(input)
        expect(result.statusCode).toBe(200)
      })
    })
  })

  describe("Business Address", () => {
    describe("Update Business Address", () => {
      it("Should throw an error if address id is missing", async () => {
        const input = {
          line1: "Rua nova",
          line2: "72B",
          line3: "Complemento novo",
          neighborhood: "Bairro Teste",
          postal_code: "731547854",
          city: "Cidade teste",
          state: "Estado teste",
          country: "País teste",

        }
        const query = {
          address_uuid: ''
        }
        const result = await request(app).put("/company-address").set('Authorization', `Bearer ${business_user_token}`).query(query).send(input)
        expect(result.statusCode).toBe(400)
        expect(result.body.error).toBe('Address Id is required')

      })

      it("Should throw an error if address can not be found", async () => {
        const input = {
          line1: "Rua nova",
          line2: "72B",
          line3: "Complemento novo",
          neighborhood: "Bairro Teste",
          postal_code: "731547854",
          city: "Cidade teste",
          state: "Estado teste",
          country: "País teste",

        }
        const query = {
          address_uuid: '1'
        }
        const result = await request(app).put("/company-address").set('Authorization', `Bearer ${business_user_token}`).query(query).send(input)
        expect(result.statusCode).toBe(400)
        expect(result.body.error).toBe('Address not found')

      })
      it("Should update address", async () => {
        const input = {
          line1: "Rua nova",
          line2: "72B",
          line3: "Complemento novo",
          neighborhood: "Bairro Teste",
          postal_code: "731547854",
          city: "Cidade teste",
          state: "Estado teste",
          country: "País teste",

        }
        const query = {
          address_uuid: business_address_uuid
        }
        const result = await request(app).put("/company-address").set('Authorization', `Bearer ${business_user_token}`).query(query).send(input)
        const data = await request(app).get("/business/info").set('Authorization', `Bearer ${business_user_token}`)

        expect(result.statusCode).toBe(200)
        expect(data.body.Address.line1).toBe('Rua nova')
        expect(data.body.Address.line3).toBe('Complemento novo')
      })
    })
  })
})
