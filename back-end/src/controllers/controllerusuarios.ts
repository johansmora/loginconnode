import { Request, Response } from "express"
import { modelusuarios } from "../models/modelsusuarios"

export const getUsuario = async (req:Request,res:Response) => {
    const listProducts = await modelusuarios.findAll();
    res.json({
        msg:(listProducts)
    })
}