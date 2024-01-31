import { it, describe, expect } from 'vitest'
import { CompanyUserMemoryRepository } from '../../../repositories/implementations/company-user.memory.repository'
import { CreateCompanyUserUseCase } from '../create-company-user.usecase'
import { CompanyUserProps } from '../../../entities/company-user.entity'

describe("Create Company User Usecase", () => {
   

    it("Should not be able to create a new Company User if CNPJ already exists", async () => {
        const companyUserRepository = new CompanyUserMemoryRepository()

        const companyUserMock:CompanyUserProps = {
            cnpj: '184189484',
            cpf:'cpf',
            email: 'admin@admin.com',
            fullName: 'Company Admin',
            permissions: ['admin'],
            function: 'RH',
            client_admin: false,
            user_name: 'admin',
            password: 'admin123'
        }

        const companyUserMockDuplicated:CompanyUserProps = {
            fullName: 'Company Admin',
            user_name: 'admin',
            permissions: ['admin'],
            client_admin: false,
            email: 'admin@admin.com',
            password: 'admin123',
            cnpj: '184189484', // Mesmo CNPJ do primeiro usuário
            cpf:'cpf',
            function: 'RH',
        }

        const createCompanyUserUseCase = new CreateCompanyUserUseCase(companyUserRepository);
        // Create first user
        await createCompanyUserUseCase.execute(companyUserMock);
        
        expect(async () => {
            await createCompanyUserUseCase.execute(companyUserMockDuplicated)
            
        }).rejects.toThrow("CPF already registered")
    });
    it("Should not be able to create a new Company User if email already exists", async () => {
        const companyUserRepository = new CompanyUserMemoryRepository()
    
        const companyUserMock = {
            cnpj: '12345678936',
            cpf:'cpf_1',
            email: 'admin@admin.com',
            fullName: 'Company Admin',
            permissions: ['admin'],
            function: 'RH',
            client_admin: false,
            user_name: 'admin',
            password: 'admin123'
        }
    
        const companyUserMockDuplicated = {
            cnpj: '98764432158',
            cpf:'cpf_2',
            email: 'admin@admin.com',
            fullName: 'Company Admin',
            permissions: ['admin'],
            function: 'RH',
            client_admin: false,
            user_name: 'admin',
            password: 'admin123'
        }
    
        const createCompanyUserUseCase = new CreateCompanyUserUseCase(companyUserRepository)
    
        await createCompanyUserUseCase.execute(companyUserMock);
    
        // Remova o async/await do bloco expect
        expect( async () => {
            await createCompanyUserUseCase.execute(companyUserMockDuplicated);
        }).rejects.toThrow("Email already registered");
    });

    it("Should not be able to create a new Company User if username already exists", async () => {
        const companyUserRepository = new CompanyUserMemoryRepository()
    
        const companyUserMock = {
            cnpj: '12345678936',
            cpf:'cpf_1',
            email: 'other@admin.com',
            fullName: 'Company Admin',
            permissions: ['admin'],
            function: 'RH',
            client_admin: false,
            user_name: 'admin',
            password: 'admin123'
        }
    
        const companyUserMockDuplicated = {
            cnpj: '98764432158',
            cpf:'cpf_2',
            email: 'admin@admin.com',
            fullName: 'Company Admin',
            permissions: ['admin'],
            function: 'RH',
            client_admin: false,
            user_name: 'admin',
            password: 'admin123'
        }
    
        const createCompanyUserUseCase = new CreateCompanyUserUseCase(companyUserRepository)
    
        await createCompanyUserUseCase.execute(companyUserMock);
    
        // Remova o async/await do bloco expect
        expect( async () => {
            await createCompanyUserUseCase.execute(companyUserMockDuplicated);
        }).rejects.toThrow("Username already registered");
    });
    
   
})