import { AppUserDataEntity } from "../../UserByCorrect/entities/appuser-data.entity";
import { AppUserInfoRequest, UserInfoResponse } from "../../app-user-dto/app-user.dto";

export interface IAppUserInfoRepository{
    findById(id: string): Promise<UserInfoResponse | null>
    saveOrUpdate(data: AppUserDataEntity): Promise<UserInfoResponse>
    findByDocumentUserInfo(document: string): Promise<UserInfoResponse | null>
    findByEmailUserInfo(email: string): Promise<UserInfoResponse | null>
    findByDocument2UserInfo(document2: string | null): Promise<UserInfoResponse | null>
    findByDocument3UserInfo(document3: string | null): Promise<UserInfoResponse | null>


}