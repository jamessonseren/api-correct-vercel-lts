import path from 'path'
import fs from 'fs'
import csv from 'csv-parser'
import { CustomError } from '../../../../../errors/custom.error';
import { AppUserInfoRequest } from '../../../app-user-dto/app-user.dto';
import { IAppUserInfoRepository } from '../../../AppUserManagement/repositories/app-user-info.repository';
import { AppUserInfoEntity, AppUserInfoProps } from '../../../AppUserManagement/entities/app-user-info.entity';
import { ICompanyDataRepository } from '../../../../Company/CompanyData/repositories/company-data.repository';
import { Uuid } from '../../../../../@shared/ValueObjects/uuid.vo';



export class CreateAppUserByCorrectUsecase {
    constructor(
        private appUserInfoRepository: IAppUserInfoRepository,
        private businessRepository: ICompanyDataRepository
    ) { }

    async execute(csvFilePath: string, business_info_uuid: string) {

        //find business by id
        const business = await this.businessRepository.findById(business_info_uuid)
        if(!business) throw new CustomError("Business not found", 404)

        const filePath = path.join(__dirname, '..', '..', '..', '..', '..','..', 'tmp', csvFilePath);
        if (!fs.existsSync(filePath)) throw new CustomError("File not found", 400);
        
        return await this.readCSV(filePath, business_info_uuid)
        
    }

    private async readCSV(filePath: string, business_info_uuid: string){
        let results: AppUserInfoRequest[] = [];
        let usersRegistered: AppUserInfoRequest[] = [];
        let alreadyRegistered: string[] = [];


        return new Promise((resolve, reject) => {

            fs.createReadStream(filePath)
                .pipe(csv({ separator: ',' }))
                .on('data', async (data) => {
                    try{
                       
                        
                    // All csv header title must be in this condition
                    if (data['\ufeffcodigo_interno'] && data['company_owner'] && data['nome_completo'] && data['sexo'] && data['rg'] && data['cpf'] && data['data_nascimento'] && data['estado_civil'] && data['total_dependentes'] && data['cargo'] && data['remuneracao']) {

                        // Process CSV data
                        const internal_company_code = await data['codigo_interno'];
                        const company_owner = JSON.parse(await data['company_owner']);
                        const full_name = await data['nome_completo'];
                        const gender = await data['sexo'];
                        const document2 = await data['rg'];
                        const document = await data['cpf'];
                        const date_of_birth = await data['data_nascimento'];
                        const marital_status = await data['estado_civil'];
                        const dependents_quantity = +await data['total_dependentes'];
                        const user_function = await data['cargo']
                        const salary = await data['remuneracao']

                        const userDataFromCSV: AppUserInfoRequest = {
                            
                            document,
                            document2,
                            full_name,
                            internal_company_code,
                            gender,
                            company_owner,
                            date_of_birth,
                            marital_status,
                            dependents_quantity,
                            user_function,
                            salary

                        };

                        //if everything works fine, add all data to results Array
                        results.push(userDataFromCSV);
                    } else {
                        throw new CustomError("Caiu aqui", 400)
                    }
                }catch(err){
                    reject(err)
                }

                })
                .on('end', async () => {

                    //after adding everything, pass each user from Results array
                    for (const user of results) {
                        const data: AppUserInfoProps = {
                            business_info_uuid: new Uuid(business_info_uuid),
                            document: user.document,
                            document2: user.document2,
                            document3: null,
                            address_uuid: null,
                            is_authenticated: false,
                            full_name: user.full_name,
                            phone:null,
                            status: 'pending',
                            internal_company_code: user.internal_company_code,
                            company_owner: user.company_owner,
                            gender: user.gender,
                            date_of_birth: user.date_of_birth,
                            function: user.user_function,
                            salary: user.salary,
                            dependents_quantity: user.dependents_quantity,
                            marital_status: user.marital_status,
                            display_name: '',
                            email: null,
                            user_document_validation_uuid:null,
                            recommendation_code: ''

                        }
                        const appUser = await AppUserInfoEntity.create(data)
                        
                        const findUser = await this.appUserInfoRepository.findByDocumentUserInfo(user.document)

                        // const findByDocument2 = await this.appUserInfoRepository.findByDocument2UserInfo(user.document2)
                        
                        if (findUser) {
                            // if(findByDocument2?.document === findUser.document){
                            //     alreadyRegistered.push(user.document);
                            // } else {
                            //     alreadyRegistered.push(user.document);

                            // }

                            alreadyRegistered.push(user.document);
                        } else {
                            await this.appUserInfoRepository.saveOrUpdate(appUser)
                            usersRegistered.push(user)

                        }
                    }

                    resolve({ usersRegistered, alreadyRegistered });
                });
        });
    }
}