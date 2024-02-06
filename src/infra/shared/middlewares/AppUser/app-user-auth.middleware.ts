import { Request, Response, NextFunction } from "express"
import { AppUserAuthPrismaRepository } from "../../../../modules/AppUser/AppUserManagement/repositories/implementations-user-auth/app-user-auth-prisma.repository"
import { EnsureValidAppUserController } from "./ensure-valid-app-user.controller.middlware"
import { AppUserJWToken } from "../../crypto/token/AppUser/jwt.token"

export const appUserIsAuth = async (req: Request, res: Response, next: NextFunction) => {

    const headerAuth = req.headers.authorization

    if (!headerAuth) return res.status(401).json({
        error: 'Token is missing'
    })

    const [, token] = headerAuth.split(" ")

    if (!token) return res.status(401).json({
        error: 'Token is missing'
    })

    const verifyToken = new AppUserJWToken().validate(token)
   
    if (verifyToken) {
        req.appUserId = verifyToken.sub

        const appUserAuthRepository = new AppUserAuthPrismaRepository()
        const ensureValidAAppUser = new EnsureValidAppUserController(appUserAuthRepository)
        
        await ensureValidAAppUser.handle(req, res)
        return next()
    }


    return res.status(401).json({
        error: "Authentication Error"
    })
}