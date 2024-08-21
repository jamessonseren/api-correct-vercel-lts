import { Request, Response, NextFunction } from "express"
import { JWTToken } from "../../crypto/token/CorrectAdmin/jwt.token"
import { CorrectAdminPrismaRepository } from "../../../../modules/CorrectAdmin/repositories/implementations/correct-admin.prisma.repository"
import { EnsureValidCorrectAdminController } from "./ensure-valid-correct-admin.controller.midleware"
import { api } from "../../../axios/axios.config"

export const correctIsAuth = async (req: Request, res: Response, next: NextFunction) => {

    const headerAuth = req.headers.authorization

    if (!headerAuth) return res.status(401).json({
        error: 'Token is required'
    })

    const [, token] = headerAuth.split(" ")

    if (!token) return res.status(401).json({
        error: 'Token is required'
    })

    //Verificar token através das api local
    //const verifyToken = new JWTToken().validate(token)

    //verificar token através da api go
    try{
      const response = await api.post("/api/v1/jwt/decode", {
        token: token
      })

      const verifyToken = response.data

      if (verifyToken) {
          req.correctAdminId = verifyToken.data.user_uuid

          const correctAdminRepository = new CorrectAdminPrismaRepository()
          const ensureValidAdmin = new EnsureValidCorrectAdminController(correctAdminRepository)
          await ensureValidAdmin.handle(req, res)

          return next()
      }
    }catch(err: any){
      console.log("Erro ao verificar token")
    }

    return res.status(401).json({
        error: "Authentication Error"
    })
}
