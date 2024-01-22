// import { prismaClient } from "../../../../../../infra/databases/prisma.config";
// import { ProductsEntity } from "../../../entities/products.entity";
// import { IProducts } from "../../products.repository";


// export class ProductsPrismaRepository implements IProducts{
//     async findById(id: string, company_user_id: string): Promise<ProductsEntity | null> {
//         const products = await prismaClient.product.findUnique({
//             where:{
//                 id,
//                 company_user_id
//             }
//         })

//         return products
//     }
//     async findByCategory(category_name: string, company_user_id:string): Promise<ProductsEntity[] | null> {
//         const products = await prismaClient.product.findMany({
//             where:{
//                 category_name,
//                 company_user_id
//             }
//         })

//         return products
//     }
//     async findByName(product_name: string, company_user_id:string): Promise<ProductsEntity | null> {
//         const products = await prismaClient.product.findFirst({
//             where:{
//                 name: product_name,
//                 company_user_id
//             }
//         })

//         return products
//     }
//     async save(data: ProductsEntity): Promise<ProductsEntity> {
//         const products = await prismaClient.product.create({
//             data:{
//                 category_name: data.category_name,
//                 name: data.name,
//                 description: data.description,
//                 banner: data.banner,
//                 company_user_id: data.company_user_id
//             }
//         })

//         return products
//     }

// }