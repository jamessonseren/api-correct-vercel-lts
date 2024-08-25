import request from 'supertest'
import { app } from '../../app'
import { InputCreateBenefitDto } from '../../modules/benefits/usecases/create-benefit/create-benefit.dto'
import { Uuid } from '../../@shared/ValueObjects/uuid.vo';

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

let authToken: string;

beforeAll(async () => {
    // Criação do admin
    await request(app).post('/admin').send(inputNewAdmin);

    // Autenticação do admin e obtenção do token
    const loginResponse = await request(app).post('/login').send(authenticateAdmin);
    authToken = loginResponse.body.token; //
});



describe("E2E Benefit tests", () => {
  const input: InputCreateBenefitDto = {
    name:"Vale Alimentação",
    description: "Descrição do vale",
    parent_uuid: null,
    item_type: 'gratuito',
    item_category: 'pre_pago',
    created_at: '',
    updated_at: ''
}
    let benefit_uuid: Uuid
    describe("E2E Create benefit", () => {

      it("Should be able to create a new benefit", async () => {
          const result = await request(app)
              .post('/benefit')
              .set('Authorization', `Bearer ${authToken}`)
              .send(input);

          expect(result.statusCode).toBe(201);

          benefit_uuid = result.body.uuid.uuid
      });
    })

    it("Should be able to get a benefit by ID", async () => {
        const result = await request(app)
            .get(`/benefit/${benefit_uuid}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(result.statusCode).toBe(200);
        // expect(result.body.uuid).toEqual(benefit_uuid)
    });

    it("Should be able to update a benefit", async () => {
        const updateInput = {
            name: "Vale Alimentação Atualizado",
            description: "Descrição atualizada do vale",
            parent_uuid: '',
            item_type: 'gratuito',
            item_category: 'pre_pago',
            created_at: '',
            updated_at: ''
        };
        const result = await request(app)

            .put(`/benefit/${benefit_uuid}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(updateInput);

        expect(result.statusCode).toBe(200); // Ajuste o status esperado conforme necessário
        // expect(result.body.description).toEqual(updateInput.description);
    });
})

describe("E2E Branch tests", () => {
  const branch1  = {
    name:"Hipermercados",
    marketing_tax: 100,
    admin_tax: 150,
    market_place_tax: 120
  }

  const branch2  = {
    name:"Supermercados",
    marketing_tax: 100,
    admin_tax: 150,
    market_place_tax: 120
  }

  const branch3  = {
    name:"Mercearias",
    marketing_tax: 130,
    admin_tax: 140,
    market_place_tax: 130
  }
  const branch4  = {
    name:"Restaurantes",
    marketing_tax: 180,
    admin_tax: 170,
    market_place_tax: 160
  }

  const branch5  = {
    name:"Alimentação",
    marketing_tax: 200,
    admin_tax: 250,
    market_place_tax: 220
  }

  let branch1_uuid: string
  describe("E2E Create branch", () => {
    it("Should register a new branch", async () => {
      const result = await request(app)

      .post(`/branch`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(branch1);

      branch1_uuid = result.body.uuid
      expect(result.statusCode).toBe(201)
      expect(result.body.marketing_tax).toBe(100)
      expect(result.body.admin_tax).toBe(150)
      expect(result.body.market_place_tax).toBe(120)

    })

    it("Should throw an error if branch is already registered", async () => {
      const result = await request(app)

      .post(`/branch`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(branch1);

      expect(result.statusCode).toBe(409)
      expect(result.body.error).toBe("Branch name already registered")

    })
  })

  describe("E2E Find branch by id", () => {

    it("Should throw an error if branch uuid is missing", async () => {
      const uuid = "64a6s1c6a"
      const result = await request(app)
      .get(`/branch/${uuid}`)
      expect(result.statusCode).toBe(404)
      expect(result.body.error).toBe("Branch not found")
    })

    it("Should return branch", async () => {

      const result = await request(app)
      .get(`/branch/${branch1_uuid}`)
      expect(result.statusCode).toBe(200)
      expect(result.body.name).toEqual("Hipermercados"),
      expect(result.body.marketing_tax).toEqual(100),
      expect(result.body.admin_tax).toEqual(150)
      expect(result.body.market_place_tax).toEqual(120)
    })
  })

  describe("E2E Find all branchs", () => {
    beforeAll(async () => {
      //register more branchs
      await request(app).post(`/branch`).set('Authorization', `Bearer ${authToken}`).send(branch2);
      await request(app).post(`/branch`).set('Authorization', `Bearer ${authToken}`).send(branch3);
      await request(app).post(`/branch`).set('Authorization', `Bearer ${authToken}`).send(branch4);
      await request(app).post(`/branch`).set('Authorization', `Bearer ${authToken}`).send(branch5);
    })


    it("Should return branchs", async () => {

      const result = await request(app)
      .get(`/branch`)

      expect(result.statusCode).toBe(200)
      expect(result.body.length).toBe(5)
    })
  })

})
