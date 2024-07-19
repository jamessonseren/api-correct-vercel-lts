import RepositoryInterface from "../../../../@shared/domain/repository/repository-interface";
import { InputCreateUserInfoDTO, UserInfoResponse } from "../../app-user-dto/app-user.dto";
import { AppUserInfoEntity } from "../entities/app-user-info.entity";

export interface IAppUserInfoRepository extends RepositoryInterface<AppUserInfoEntity>{
    saveOrUpdate(data: InputCreateUserInfoDTO): Promise<void>
    findByDocumentUserInfo(document: string): Promise<AppUserInfoEntity | null>
    // findByEmailUserInfo(email: string): Promise<UserInfoResponse | null>
    // findByDocument2UserInfo(document2: string | null): Promise<AppUserInfoEntity>
    // findByDocument3UserInfo(document3: string | null): Promise<AppUserInfoEntity>
    // findManyByBusiness(business_info_uuid: string): Promise<AppUserInfoEntity[] | []>
}