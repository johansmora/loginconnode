import { Request,Response } from "express";
import  bcrypt from "bcrypt";
import { User } from "../models/modeluser";
import jwt from "jsonwebtoken"// importamos el token

export const newUser = async (req:Request, res:Response) => {

    const { Usuario,Password } = req.body;//enviar datos a la bd


    //validamos si el usuario existe en la base de datos
    const user = await User.findOne({where:{Usuario:Usuario}})//despues del where se filtra por la columna de la base de datos
    if(user){
        return res.status(400).json({
            msg: "el nombre " + Usuario + "ya se encuentra registrado"
        })
    }
    //fin de la validacion
    
        const hashedPassword = await bcrypt.hash(Password,10)//encriptar la contraseña

        try {//validar los datos para que no de error ... esto cuando la cedula sea igual en el caso real
            await User.create({//creacion del usuario
                Usuario:Usuario,
                Password:hashedPassword
            })
            res.json({
                msg:'Usuario '+ Usuario + ' creado exitosamente',
            
            });
        } catch (error) {
            res.status(400).json({
                msg: "uups ocurrio un error al crear el usuario",
                error
            })
        }



}

export const loginUser = async(req:Request, res:Response) => {

    const { Usuario,Password } = req.body;

//validamos si el usurio existe 
const user:any = await User.findOne({where:{Usuario:Usuario}})//despues del where se filtra por la columna de la base de datos

if (!user){
    return res.status(404).json({
        msg: 'el usuario no se encuentra registrado en el sistema'
})
}
//validamos password
const passwordValid = await bcrypt.compare(Password,user.Password)
if (!passwordValid) {
    return res.status(400).json({
        msg: 'la contraseña es incorrecta'
});
}

//generamos token 
const token = jwt.sign({
    Usuario:Usuario
},process.env.SECRET_KEY ||'kqrkD1!uTn)vl5dt$(M[ki(')

res.json({token});
}