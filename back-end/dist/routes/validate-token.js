"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization']; //obtener el token
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            //tiene token
            const bearerToken = headerToken.slice(7); // trare el token sin el bearer
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRECT_KEY || 'kqrkD1!uTn)vl5dt$(M[ki(');
            next(); // comando para ejecutar el token y que nos deje pasar a la vista
        }
        catch (error) {
            res.status(401).json({
                msg: "Token no Valido"
            });
        }
    }
    else {
        res.status(401).json({
            msg: "acceso denegado"
        });
    }
};
exports.default = validateToken;
