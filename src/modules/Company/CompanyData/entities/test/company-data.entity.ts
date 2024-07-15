// import { describe, expect, it } from "vitest";
// import { CompanyDataEntity } from "../company-data.entity";

// describe("Company data Entity", () => {
//     it("Should be able to create Company Data", async () => {
//         const companyData = await CompanyDataEntity.create({
//             corporate_name: 'Test Name',
//             cnpj: '12345678901',
//             classification: 'big one',
//             total_employees: 5,
//             phone_1: '+552187954588',
//             phone_2: '',
//             company_user_id: 'randomId',
//             correct_admin_id: 'anotherID'
//         })

//         expect(companyData).toBeInstanceOf(CompanyDataEntity)
//         expect(companyData).toHaveProperty('id')
//     })

//     it("Should not be able to create Company Data if corporate name is missing", async () => {

//         expect(async () => {
//             await CompanyDataEntity.create({
//                 corporate_name: '',
//                 cnpj: '12345678901',
//                 classification: 'big one',
//                 total_employees: 5,
//                 phone_1: '+552187954588',
//                 phone_2: '',
//                 company_user_id: 'randomId',
//                 correct_admin_id: 'anotherID'
//             })

//         }).rejects.toThrow("Corporate name is required")
//     })

//     it("Should not be able to create Company Data if cnpj is missing", async () => {

//         expect(async () => {
//             await CompanyDataEntity.create({
//                 corporate_name: 'Test Name',
//                 cnpj: '',
//                 classification: 'big one',
//                 total_employees: 5,
//                 phone_1: '+552187954588',
//                 phone_2: '',
//                 company_user_id: 'randomId',
//                 correct_admin_id: 'anotherID'
//             })

//         }).rejects.toThrow("CNPJ is required")
//     })

//     it("Should not be able to create Company Data if classification is missing", async () => {

//         expect(async () => {
//             await CompanyDataEntity.create({
//                 fantasy_name: 'Test Name',
//                 document: 'cnpj',
//                 classification: '',
//                 colaborators_number: 5,
//                 phone_1: '+552187954588',
//                 phone_2: '',
//                 company_user_id: 'randomId',
//                 correct_admin_id: 'anotherID'
//             })

//         }).rejects.toThrow("Company classification is required")
//     })
// })