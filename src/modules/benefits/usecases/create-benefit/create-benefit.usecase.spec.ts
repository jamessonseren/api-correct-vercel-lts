import { InputCreateBenefitDto } from "./create-benefit.dto";
import { CreateBenefitUsecase } from "./create-benefit.usecase";

const input: InputCreateBenefitDto = {
    name:"Vale Alimentação",
    description: "Descrição do vale",
    item_type: 'gratuito',
    item_category: 'pre_pago'
}
const MockRepository = () => {
    return {
      create: jest.fn(),
      getByID: jest.fn(),
      update: jest.fn(),
      list: jest.fn(),
    };
  };

describe("Unit test create benefit usecase", () => {
    it("Should create a benefit", async () => {
        const benefitMockRepository = MockRepository()
        const createBenefitUsecase = new CreateBenefitUsecase(benefitMockRepository)

        const output = await createBenefitUsecase.execute(input)

        expect(output).toEqual({
            uuid: expect.any(String),
            name: input.name,
            description: input.description,
            item_type: input.item_type,
            item_category: input.item_category
        })
    })

    it("Should thrown an error if name is missing", async () => {
        const benefitMockRepository = MockRepository()
        const createBenefitUsecase = new CreateBenefitUsecase(benefitMockRepository)

        input.name = ""

        await expect(createBenefitUsecase.execute(input)).rejects.toThrow("Name is required")
    })

})