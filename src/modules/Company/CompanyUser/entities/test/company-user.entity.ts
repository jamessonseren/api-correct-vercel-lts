// import { it, expect, describe } from 'vitest'
// import { CompanyUserEntity } from '../company-user.entity'

// describe("Company User Entity", () => {
//     it("Should be able to create a Company User", async () => {
//         const companyUser = await CompanyUserEntity.create({
//             cnpj: '184189484',
//             email: 'admin@admin.com',
//             fullName: 'Company Admin',
//             permissions: ['admin'],
//             function: 'RH',
//             client_admin: false,
//             user_name: 'admin',
//             password: 'admin123'
//         })

//         expect(companyUser).toBeInstanceOf(CompanyUserEntity)
//         expect(companyUser).toHaveProperty('id')
//     })

//     it("Should not be able to create a Company User if email is empty", async () => {
//         expect(async () => {
//             await CompanyUserEntity.create({
//                 cnpj: '184189484',
//                 email: '',
//                 fullName: 'Company Admin',
//                 permissions: ['admin'],
//                 function: 'RH',
//                 client_admin: false,
//                 user_name: 'admin',
//                 password: 'admin123'
//             })

//         }).rejects.toThrow("Email is required")
//     })
//     it("Should not be able to create a Company User if cnpj is empty", async () => {
//         expect(async () => {
//             await CompanyUserEntity.create({
//                 cnpj: '',
//                 email: 'admin@admin.com',
//                 fullName: 'Company Admin',
//                 permissions: ['admin'],
//                 function: 'RH',
//                 client_admin: false,
//                 user_name: 'admin',
//                 password: 'admin123'
//             })

//         }).rejects.toThrow("CNPJ is required")
//     })
//     it("Should not be able to create a Company User if password is empty", async () => {
//         expect(async () => {
//             await CompanyUserEntity.create({
//                 cnpj: '184189484',
//                 email: 'admin@admin.com',
//                 fullName: 'Company Admin',
//                 permissions: ['admin'],
//                 function: 'RH',
//                 client_admin: false,
//                 user_name: 'admin',
//                 password: ''
//             })

//         }).rejects.toThrow("Password is required")
//     })

//     it("Should not be able to create a Company User if name is empty", async () => {
//         expect(async () => {
//             await CompanyUserEntity.create({
//                 cnpj: '184189484',
//                 email: 'admin@admin.com',
//                 fullName: '',
//                 permissions: ['admin'],
//                 function: 'RH',
//                 client_admin: false,
//                 user_name: 'admin',
//                 password: 'admin123'
//             })

//         }).rejects.toThrow("Name is required")
//     })

//     it("Should not be able to create a Company User if function is empty", async () => {
//         expect(async () => {
//             await CompanyUserEntity.create({
//                 cnpj: '184189484',
//                 email: 'admin@admin.com',
//                 fullName: 'Company Admin',
//                 permissions: ['admin'],
//                 function: '',
//                 client_admin: false,
//                 user_name: 'admin',
//                 password: 'admin123'
//             })

//         }).rejects.toThrow("Function is required")
//     })
// })