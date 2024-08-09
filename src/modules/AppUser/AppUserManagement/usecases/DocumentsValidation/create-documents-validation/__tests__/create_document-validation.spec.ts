import { UserDocumentValidationStatus } from '@prisma/client';
import { DocumentValidationProps } from '../../../../entities/app-user-document-validation.entity';
import { CreateDocumentsValidationUsecase } from '../create-documents-validation.usecase'
import { InputCreateDocumentValidationDTO } from '../dto/create-user-validation.dto';
import { Uuid } from '../../../../../../../@shared/ValueObjects/uuid.vo';

const DocumentValidationMockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        saveOrUpdate: jest.fn()
    }
}

const UserInfoMockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        saveOrUpdate: jest.fn(),
        findByDocumentUserInfo: jest.fn(),
        save: jest.fn(),
        findByDocument2UserInfo: jest.fn(),
        findManyByBusiness: jest.fn()

    };
}

const AppUserAuthMockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        findByDocument: jest.fn(),
        findByEmail: jest.fn()
    };
};
describe("Unity test create document validation", () => {
    it("Should throw an error if user auth is not found", async () => {
        const documentValidationRepository = DocumentValidationMockRepository()
        const userinfoRepository = UserInfoMockRepository()
        const userAuthRepository = AppUserAuthMockRepository()

        const input: InputCreateDocumentValidationDTO = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send,
            user_uuid: new Uuid('8ecfc6ca-b943-4c50-afd2-f86c32542b8c')
        };

        const usecase = new CreateDocumentsValidationUsecase(
            userAuthRepository,
            userinfoRepository,
            documentValidationRepository
        )

        try {
            await usecase.execute(input)
        } catch (err: any) {
            expect(err.message).toBe("User auth not found")
            expect(err.statusCode).toBe(401)
        }

    })

    it("Should throw an error if user info is not found", async () => {
        const documentValidationRepository = DocumentValidationMockRepository()
        const userinfoRepository = UserInfoMockRepository()
        const userAuthRepository = AppUserAuthMockRepository()

        userAuthRepository.find.mockResolvedValueOnce({})

        const input: InputCreateDocumentValidationDTO = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send,
            user_uuid: new Uuid('8ecfc6ca-b943-4c50-afd2-f86c32542b8c')
        };

        const usecase = new CreateDocumentsValidationUsecase(
            userAuthRepository,
            userinfoRepository,
            documentValidationRepository
        )

        try {
            await usecase.execute(input)
        } catch (err: any) {
            expect(err.message).toBe("User info not found")
            expect(err.statusCode).toBe(404)
        }

    })

    it("Should register only one document", async () => {
        const documentValidationRepository = DocumentValidationMockRepository()
        const userinfoRepository = UserInfoMockRepository()
        const userAuthRepository = AppUserAuthMockRepository()

        userAuthRepository.find.mockResolvedValueOnce({
            user_info_uuid: new Uuid('8ecfc6ca-b943-4c50-afd2-f86c32542b8c')
        })
        userinfoRepository.find.mockResolvedValueOnce({
        })

        const input: InputCreateDocumentValidationDTO = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: '',
            document_back_base64: '',
            document_selfie_base64: '',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send,
            user_uuid: new Uuid('8ecfc6ca-b943-4c50-afd2-f86c32542b8c')
        };

        const usecase = new CreateDocumentsValidationUsecase(
            userAuthRepository,
            userinfoRepository,
            documentValidationRepository
        )

        const result = await usecase.execute(input)
        expect(result.selfie_status).toBe("under_analysis")
        expect(result.document_back_status).toBe("pending_to_send")
        expect(result.document_front_status).toBe("pending_to_send")
        expect(result.document_selfie_status).toBe("pending_to_send")
    })

    it("Should register two documents at once", async () => {
        const documentValidationRepository = DocumentValidationMockRepository()
        const userinfoRepository = UserInfoMockRepository()
        const userAuthRepository = AppUserAuthMockRepository()

        userAuthRepository.find.mockResolvedValueOnce({
            user_info_uuid: new Uuid('8ecfc6ca-b943-4c50-afd2-f86c32542b8c')
        })
        userinfoRepository.find.mockResolvedValueOnce({})

        const input: InputCreateDocumentValidationDTO = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: '',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: '',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send,
            user_uuid: new Uuid('8ecfc6ca-b943-4c50-afd2-f86c32542b8c')
        };

        const usecase = new CreateDocumentsValidationUsecase(
            userAuthRepository,
            userinfoRepository,
            documentValidationRepository
        )

        const result = await usecase.execute(input)
        expect(result.selfie_status).toBe("under_analysis")
        expect(result.document_back_status).toBe("under_analysis")
        expect(result.document_front_status).toBe("pending_to_send")
        expect(result.document_selfie_status).toBe("pending_to_send")
    })

    it("Should update table by adding new documents", async () => {
        const documentValidationRepository = DocumentValidationMockRepository()
        const userinfoRepository = UserInfoMockRepository()
        const userAuthRepository = AppUserAuthMockRepository()

        userAuthRepository.find.mockResolvedValueOnce({
            user_info_uuid: new Uuid('8ecfc6ca-b943-4c50-afd2-f86c32542b8c')
        })
        userinfoRepository.find.mockResolvedValueOnce({})
        documentValidationRepository.find.mockResolvedValueOnce({})

        const input: InputCreateDocumentValidationDTO = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: '',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send,
            user_uuid: new Uuid('8ecfc6ca-b943-4c50-afd2-f86c32542b8c')
        };

        const usecase = new CreateDocumentsValidationUsecase(
            userAuthRepository,
            userinfoRepository,
            documentValidationRepository
        )

        const result = await usecase.execute(input)
        expect(result.selfie_status).toBe("under_analysis")
        expect(result.document_back_status).toBe("under_analysis")
        expect(result.document_front_status).toBe("pending_to_send")
        expect(result.document_selfie_status).toBe("under_analysis")
    })

    it("Should have all documents registered", async () => {
        const documentValidationRepository = DocumentValidationMockRepository()
        const userinfoRepository = UserInfoMockRepository()
        const userAuthRepository = AppUserAuthMockRepository()

        userAuthRepository.find.mockResolvedValueOnce({
            user_info_uuid: new Uuid('8ecfc6ca-b943-4c50-afd2-f86c32542b8c')
        })
        userinfoRepository.find.mockResolvedValueOnce({})
        documentValidationRepository.find.mockResolvedValueOnce({})

        const input: InputCreateDocumentValidationDTO = {
            selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_back_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_selfie_base64: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
            document_front_status: UserDocumentValidationStatus.pending_to_send,
            document_back_status: UserDocumentValidationStatus.pending_to_send,
            selfie_status: UserDocumentValidationStatus.pending_to_send,
            document_selfie_status: UserDocumentValidationStatus.pending_to_send,
            user_uuid: new Uuid('8ecfc6ca-b943-4c50-afd2-f86c32542b8c')
        };

        const usecase = new CreateDocumentsValidationUsecase(
            userAuthRepository,
            userinfoRepository,
            documentValidationRepository
        )

        const result = await usecase.execute(input)
        expect(result.selfie_status).toBe("under_analysis")
        expect(result.document_back_status).toBe("under_analysis")
        expect(result.document_front_status).toBe("under_analysis")
        expect(result.document_selfie_status).toBe("under_analysis")
    })
})