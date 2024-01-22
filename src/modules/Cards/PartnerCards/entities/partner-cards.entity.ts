import { randomUUID } from 'crypto'
import { CustomError } from '../../../../errors/custom.error'

export type PartnerCardsProps = {
    adm_correct_fee: number
    mkt_correct_fee: number
    total_installments: number
    cashback: number
    validate: boolean

}

export class PartnerCardsEntity{
    id: string
    contract_number: string
    adm_correct_fee: number
    mkt_correct_fee: number
    total_installments: number
    cashback: number
    validate: boolean

   private constructor(props: PartnerCardsProps){
        this.id = randomUUID()
        this.contract_number = randomUUID()
        // this.start_day_cycle = props.start_day_cycle
        // this.end_day_cycle = props.end_day_cycle
        this.adm_correct_fee = props.adm_correct_fee
        this.mkt_correct_fee = props.mkt_correct_fee
        this.total_installments = props.total_installments
        this.cashback = props.cashback
        this.validate = props.validate

        // if(!props.start_day_cycle) throw new CustomError("Start day is required", 401)
        // if(!props.end_day_cycle) throw new CustomError("End day is required", 401)
        if(props.adm_correct_fee === null) throw new CustomError("Admin correct fee is required", 401)
        if(props.mkt_correct_fee === null) throw new CustomError("Marketing correct fee is required", 401)
        if(props.cashback === null) throw new CustomError("Cashback value is required", 401)
        
        // if(typeof props.start_day_cycle !== 'number' ) throw new CustomError("Start Date must be number type", 401)
        // if(typeof props.end_day_cycle !== 'number') throw new CustomError("End Date must be number type"), 401
        if(typeof props.adm_correct_fee !== 'number') throw new CustomError("Correct fee must be a number", 401)
        if(typeof props.mkt_correct_fee !== 'number') throw new CustomError("Correct fee must be a number", 401)
        if(typeof props.total_installments !== 'number') throw new CustomError("Total installments must be number type", 401)
        if(typeof props.cashback !== 'number') throw new CustomError("Cashback must be a number", 401)

    }

    static async create(data: PartnerCardsProps){
       
        const partnerCards = new PartnerCardsEntity(data)
        return partnerCards
    }
}