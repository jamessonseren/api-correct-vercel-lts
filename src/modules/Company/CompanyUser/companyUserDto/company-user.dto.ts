import { Permissions  } from "@prisma/client"

export type BusinessUserResponse = {
    uuid: string,
    business_info_uuid: string | null,
    is_admin: boolean,
    business_document: string,
    admin_document: string | null,
    name: string | null,
    email: string | null,
    user_name: string,
    function: string | null
    permissions: Permissions[],
    is_client: boolean,   
    is_active: boolean
}