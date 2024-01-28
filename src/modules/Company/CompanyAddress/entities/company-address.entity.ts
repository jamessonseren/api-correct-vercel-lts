import { randomUUID } from 'crypto'
import { CustomError } from '../../../../errors/custom.error'

export type CompanyAddressProps = {
    line1: string
    line2: string
    line3: string | null
    postal_code: string
    neighborhood: string
    city: string
    state: string
    country: string

}

export class CompanyAddressEntity {
    uuid: string
    line1: string
    line2: string
    line3: string | null
    neighborhood: string
    postal_code: string
    city: string
    state: string
    country: string


    private constructor(props: CompanyAddressProps) {

        this.uuid = randomUUID()
        this.line1 = props.line1
        this.line2 = props.line2
        this.line3 = props.line3
        this.neighborhood = props.neighborhood
        this.postal_code = props.postal_code
        this.city = props.city
        this.state = props.state
        this.country = props.country

    }

    static async create(data: CompanyAddressProps) {
        if (!data.line1) throw new CustomError("Street is required", 400)
        if (!data.line2) throw new CustomError("Number is required", 400)
        if (!data.neighborhood) throw new CustomError("Neighbohood is required", 400)
        if (!data.postal_code) throw new CustomError("Zip Code is required", 400)
        if (!data.city) throw new CustomError("City is required", 400)
        if (!data.state) throw new CustomError("State is required", 400)
        if (!data.country) throw new CustomError("Country is required", 400)
        
        const companyAddress = new CompanyAddressEntity(data)
        return companyAddress
    }



}