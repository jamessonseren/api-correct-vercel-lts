import { randomUUID } from 'crypto'
import { CustomError } from '../../../../errors/custom.error'

export type AppUserAddressProps = {
    line1: string | null
    line2: string | null
    line3: string | null
    postal_code: string
    neighborhood: string
    city: string
    state: string
    country: string
}

export class AppUserAddressEntity  {
    uuid: string
    line1: string | null
    line2: string | null
    line3: string | null
    postal_code: string
    neighborhood: string | null
    city: string | null
    state: string | null
    country: string | null

    private constructor(props: AppUserAddressProps) {
        this.uuid = randomUUID()
        this.line1 = props.line1
        this.line2 = props.line2
        this.line3 = props.line3
        this.postal_code = props.postal_code
        this.neighborhood = props.neighborhood
        this.city = props.city
        this.state = props.state
        this.country = props.country
    }

    static async create(data: AppUserAddressProps) {

        //rules validation
        if (!data.line1) throw new CustomError("Line1 is required", 400)
        if (!data.line2) throw new CustomError("Line2 is required", 400)
        if (!data.postal_code) throw new CustomError("Postal code is required", 400)
        if (!data.neighborhood) throw new CustomError("Neighborhood is required", 400)
        if (!data.city) throw new CustomError("City is required", 400)
        if (!data.state) throw new CustomError("State is required", 400)
        if (!data.country) throw new CustomError("Country is required", 400)

        //types validation
        if (typeof data.line1 !== 'string') throw new CustomError("Line1 must be a string", 400)
        if (typeof data.line2 !== 'string') throw new CustomError("Line2 must be a string", 400)
        if (data.line3 && typeof data.line3 !== 'string') throw new CustomError("Line3 must be a string", 400)
        if (typeof data.postal_code !== 'string') throw new CustomError("Postal code must be a string", 400)
        if (typeof data.neighborhood !== 'string') throw new CustomError("Neighborhood must be a string", 400)
        if (typeof data.city !== 'string') throw new CustomError("City must be a string", 400)
        if (typeof data.state !== 'string') throw new CustomError("State must be a string", 400)
        if (typeof data.country !== 'string') throw new CustomError("Country must be a string", 400)

        const user = new AppUserAddressEntity(data)
        return user
    }
}