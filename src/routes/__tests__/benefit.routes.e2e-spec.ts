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

const input: InputCreateBenefitDto = {
    name:"Vale Alimentação",
    description: "Descrição do vale",
    parent_uuid: null,
    item_type: 'gratuito',
    item_category: 'pre_pago',
    created_at: '',
    updated_at: ''
}

describe("E2E Benefit tests", () => {
    let benefit_uuid: Uuid
    it("Should be able to create a new benefit", async () => {
        const result = await request(app)
            .post('/benefit')
            .set('Authorization', `Bearer ${authToken}`) 
            .send(input);

        expect(result.statusCode).toBe(201); 
        
        benefit_uuid = result.body.uuid.uuid
    });

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