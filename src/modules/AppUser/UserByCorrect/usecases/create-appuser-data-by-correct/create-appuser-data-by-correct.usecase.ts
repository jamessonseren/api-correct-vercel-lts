import path from 'path'
import fs from 'fs'
import csv from 'csv-parser'
import { parse } from 'date-fns'
import { IAppUserRepository } from "../../repositories/app-user-data-repostory";
import { CustomError } from '../../../../../errors/custom.error';
import { AppUserProps, AppUserDataEntity } from '../../entities/appuser-data.entity';
import { AppUserRequest } from '../../app_user-dto/app_user.dto';
import { ICompanyDataRepository } from '../../../../Company/CompanyData/repositories/company-data.repository';



export class CreateAppUserByCorrectUsecase {
    constructor(
        private appUserRepository: IAppUserRepository,
    ) { }

    async execute(csvFilePath: string, business_info_uuid: string) {


        const filePath = path.join(__dirname, '..', '..', '..', '..', '..','..', 'tmp', csvFilePath);
        if (!fs.existsSync(filePath)) throw new CustomError("File not found", 400);
        
        return await this.readCSV(filePath, business_info_uuid)
        
    }

    private async readCSV(filePath: string, business_info_uuid: string){
        let results: AppUserRequest[] = [];
        let usersRegistered: AppUserRequest[] = [];
        let alreadyRegistered: string[] = [];


        return new Promise((resolve, reject) => {

            fs.createReadStream(filePath)
                .pipe(csv({ separator: ',' }))
                .on('data', async (data) => {
                    try{
                    // All csv header title must be in this condition
                    if (data['\ufeffcodigo_interno'] && data['company_owner'] && data['nome_completo'] && data['sexo'] && data['rg'] && data['cpf'] && data['data_nascimento'] && data['estado_civil'] && data['total_dependentes'] && data['cargo'] && data['remuneracao']) {

                        // Process CSV data
                        const internal_company_code = await data['\ufeffcodigo_interno'];
                        const company_owner = JSON.parse(await data['company_owner']);
                        const full_name = await data['nome_completo'];
                        const gender = await data['sexo'];
                        const document2 = await data['rg'];
                        const document = await data['cpf'];
                        const date_of_birth = parse(await data['data_nascimento'], 'dd/MM/yyyy', new Date());
                        const marital_status = await data['estado_civil'];
                        const dependents_quantity = +await data['total_dependentes'];
                        const user_function = await data['cargo']
                        const salary = await data['remuneracao']

                        const userDataFromCSV: AppUserRequest = {
                            internal_company_code,
                            company_owner,
                            full_name,
                            gender,
                            document,
                            document2,
                            date_of_birth,
                            marital_status,
                            dependents_quantity,
                            user_function,
                            salary

                        };

                        //if everything works fine, add all data to results Array
                        results.push(userDataFromCSV);
                    } else {
                        throw new CustomError("File must be according to model!", 400)
                    }
                }catch(err){
                    reject(err)
                }

                })
                .on('end', async () => {

                    //after adding everything, pass each user from Results array
                    for (const user of results) {
                        const data: AppUserProps = {
                            document3: null,
                            business_info_uuid: business_info_uuid,
                            address_uuid: null,
                            is_authenticated: false,
                            full_name: user.full_name,
                            phone:null,
                            status: 'pending',
                            internal_company_code: user.internal_company_code,
                            company_owner: user.company_owner,
                            gender: user.gender,
                            document: user.document,
                            document2: user.document2,
                            date_of_birth: user.date_of_birth,
                            function: user.user_function,
                            salary: null,
                            dependents_quantity: user.dependents_quantity,
                            marital_status: user.marital_status,
                            display_name: null,
                            email: ''

                        }

                        const appUser = await AppUserDataEntity.create(data)

                        const findUser = await this.appUserRepository.findByCPF(user.document)

                        if (findUser) {
                            alreadyRegistered.push(user.document);


                        } else {
                            await this.appUserRepository.saveOrUpdate(appUser)
                            usersRegistered.push(user)

                        }
                    }

                    resolve({ usersRegistered, alreadyRegistered });
                });
        });
    }
}