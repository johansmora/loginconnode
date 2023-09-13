import { Router } from "express";
import { getUsuario } from "../controllers/controllerusuarios";
import validateToken from "./validate-token";

const router = Router();

router.get('/',validateToken,getUsuario);//entra a la ruta valida el token y luego me deja ingresar a los usuarios

export default router;
