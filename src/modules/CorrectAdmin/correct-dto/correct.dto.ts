export interface InputCreateAdminDTO {
    name: string
    email: string
    userName: string
    password: string
    isAdmin: boolean
}

export interface OutputCreateAdminDTO{
    uuid: string
    name: string
    email: string
    userName: string
    isAdmin: boolean
}

export interface OutputFindAdminDTO{
    uuid: string
    name: string
    email: string
    userName: string
    isAdmin: boolean
}


export interface OutputFindAdminAuthDTO{
    uuid: string
    name: string
    email: string
    userName: string
    password: string
    isAdmin: boolean
}