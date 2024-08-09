import { BenefitsEntity } from "../../../entities/benefit.entity";
import { InputCreateBenefitDto } from "../../create-benefit/create-benefit.dto";
import { GetListBenefitUsecase } from "../get-list-benefit.usecase";

const benefitInput1: InputCreateBenefitDto = {
    name: "Vale Alimentação",
    description: "Descrição Vale Alimentação",
    item_type: 'gratuito',
    item_category: 'pre_pago',
    parent_uuid: null,
    created_at: '',
    updated_at: ''
  }

  const benefitInput2: InputCreateBenefitDto = {
    name: "Vale Refeição",
    description: "Descrição Vale Refeição",
    item_type: 'gratuito',
    item_category: 'pre_pago',
    parent_uuid: null,
    created_at: '',
    updated_at: ''
  }
  
  const benefit1 = new BenefitsEntity(benefitInput1)
  
  const benefit2 = new BenefitsEntity(benefitInput2)

  const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([benefit1, benefit2])),
    };
  };

describe("Unity test list of benefit", () => {
    it("Shoudl list benefits", async () => {
        const benefitsRepository = MockRepository()
        const listBenefits = new GetListBenefitUsecase(benefitsRepository)

        const output = await listBenefits.execute({})

        expect(output.benefits.length).toBe(2)
        expect(output.benefits[0].uuid).toBe(benefit1.uuid)
        expect(output.benefits[0].name).toBe(benefit1.name)
        expect(output.benefits[0].description).toBe(benefit1.description)
        expect(output.benefits[0].item_type).toBe(benefit1.item_type)
        expect(output.benefits[0].item_category).toBe(benefit1.item_category)
        expect(output.benefits[1].uuid).toBe(benefit2.uuid)
        expect(output.benefits[1].name).toBe(benefit2.name)
        expect(output.benefits[1].description).toBe(benefit2.description)
        expect(output.benefits[1].item_type).toBe(benefit2.item_type)
        expect(output.benefits[1].item_category).toBe(benefit2.item_category)


    })
})