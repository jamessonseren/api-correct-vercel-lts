import { AppUserDataEntity } from "../../UserByCorrect/entities/appuser-data.entity";
import { AppUserInfoRequest, UserInfoResponse } from "../../app-user-dto/app-user.dto";
import { AppUserInfoEntity } from "../entities/app-user-info.entity";

export interface IAppUserInfoRepository{
    findById(id: string): Promise<UserInfoResponse | null>
    saveOrUpdate(data: AppUserInfoEntity): Promise<void>
    save(data: AppUserInfoEntity): Promise<void>
    findByDocumentUserInfo(document: string): Promise<UserInfoResponse | null>
    findByEmailUserInfo(email: string): Promise<UserInfoResponse | null>
    findByDocument2UserInfo(document2: string | null): Promise<UserInfoResponse | null>
    findByDocument3UserInfo(document3: string | null): Promise<UserInfoResponse | null>
}