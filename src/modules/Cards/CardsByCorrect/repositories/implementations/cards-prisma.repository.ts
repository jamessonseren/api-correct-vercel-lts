import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { CardsEntity, CardsProps } from "../../entities/cards.entity";
import { ICards } from "../cards-repository";

export class CardsPrismaRepository implements ICards{
    
    async findById(id: string): Promise<CardsEntity | null> {
        const card = await prismaClient.cards.findUnique({
            where:{
                id
            }
        })

        return card
    }
    async findByName(name: string): Promise<CardsEntity | null> {
        const card = await prismaClient.cards.findUnique({
            where:{
                card_name: name
            }
        })
        return card
    }

    async findAllCards(): Promise<CardsEntity[] | null> {
        const cards = await prismaClient.cards.findMany();

        return cards
    }
    async saveOrUpdate(data: CardsEntity): Promise<CardsEntity> {
        const card = await prismaClient.cards.upsert({
            where:{
                card_name: data.card_name
            },
            create:{
                card_name: data.card_name,
                card_type: data.card_type,

            },
            update:{
                card_name: data.card_name,
                card_type: data.card_type,
            }
        })

        return card
    }

}