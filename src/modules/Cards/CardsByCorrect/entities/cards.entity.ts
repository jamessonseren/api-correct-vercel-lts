import { CardType } from "@prisma/client"
import { randomUUID } from 'crypto'
import { CustomError } from "../../../../errors/custom.error"

export type CardsProps = {
    card_name: string
    card_type: CardType
}

export class CardsEntity{

    id: string
    card_name: string
    card_type: CardType

    private constructor(props: CardsProps){

        this.id = randomUUID()
        this.card_name = props.card_name
        this.card_type = props.card_type
        
        if(!props.card_name) throw new CustomError("Card name is required", 403)
        if(!props.card_type) throw new CustomError("Card type is required", 403)

        if(!(props.card_type in CardType)) throw new CustomError("Invalid card type", 403)
        if(typeof props.card_name !== 'string') throw new CustomError("Card name must be a String", 403)

    }
    

    static async create(data: CardsProps){
        const cards = new CardsEntity(data)
        return cards
    }
}