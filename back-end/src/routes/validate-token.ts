import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'

const validateToken= (req:Request, res:Response, next:NextFunction) =>{ // verificar si el token esta valido
    const headerToken = req.headers['authorization'];//obtener el token
    if(headerToken != undefined && headerToken.startsWith('Bearer ')){

        try {
                    //tiene token
        const bearerToken = headerToken.slice(7)// trare el token sin el bearer
        jwt.verify(bearerToken,process.env.SECRECT_KEY ||'kqrkD1!uTn)vl5dt$(M[ki(');
        next();// comando para ejecutar el token y que nos deje pasar a la vista
        } catch (error) {
            res.status(401).json({ //el error 401 es para errores de acceso no autorizados
                msg: "Token no Valido"
            })
        }

    }else{
        res.status(401).json({
            msg:"acceso denegado"
        })
    }


}
export default validateToken;