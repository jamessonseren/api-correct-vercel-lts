import { Uuid } from "../../../@shared/ValueObjects/uuid.vo"

export interface InputCreateAdminDTO {
    name: string
    email: string
    userName: string
    password: string
    isAdmin: boolean
}

export interface OutputCreateAdminDTO{
    uuid: Uuid
    name: string
    email: string
    userName: string
    isAdmin: boolean
}

export interface OutputFindAdminDTO{
    uuid: Uuid
    name: string
    email: string
    userName: string
    isAdmin: boolean
}


export interface OutputFindAdminAuthDTO{
    uuid: Uuid
    name: string
    email: string
    userName: string
    password: string
    isAdmin: boolean
}