// import { it, describe, expect } from 'vitest'
// import { CorrectAdminMemoryRepository } from '../../../repositories/implementations/correct-admin.memory.repository'
// import { CorrectAdminRequest, CreateCorrectAdminUseCase } from '../create-correct-admin.usecase'

// describe("Create Correct Admin Usecase", () => {
//     it("Should be able to create a new Admin", async () => {
//         const adminRepository = new CorrectAdminMemoryRepository()

//         const adminMock: CorrectAdminRequest = {
//             email: 'admin@admin.com',
//             name: 'Correct Admin',
//             userName: 'correct_admin',
//             password: 'admin123',
//         }
//         const createAdminUseCase = new CreateCorrectAdminUseCase(adminRepository)
//         const adminCreated = await createAdminUseCase.execute(adminMock)
//         expect(adminCreated).toHaveProperty('id')
//     })

//     it("Should not be able to create a new Admin if userName already exists", async () => {
//         const adminRepository = new CorrectAdminMemoryRepository()

//         const adminMock: CorrectAdminRequest = {
//             email: 'admin@admin.com',
//             name: 'Correct Admin',
//             userName: 'correct_admin',
//             password: 'admin123',
//         }
//         const adminMockDuplicated: CorrectAdminRequest = {
//             email: 'admin@admin.com',
//             name: 'Correct Admin',
//             userName: 'correct_admin',
//             password: 'admin123',
//         }
//         const createAdminUseCase = new CreateCorrectAdminUseCase(adminRepository)
//         await createAdminUseCase.execute(adminMock)

//         expect(async () => {
//            await createAdminUseCase.execute(adminMockDuplicated)
//         }).rejects.toThrow("UserName already exists")
//     })
// })