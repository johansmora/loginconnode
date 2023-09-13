"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const modeluser_1 = require("../models/modeluser");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // importamos el token
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Usuario, Password } = req.body; //enviar datos a la bd
    //validamos si el usuario existe en la base de datos
    const user = yield modeluser_1.User.findOne({ where: { Usuario: Usuario } }); //despues del where se filtra por la columna de la base de datos
    if (user) {
        return res.status(400).json({
            msg: "ya existe un usuario con esa con ese nick name" + Usuario
        });
    }
    //fin de la validacion
    const hashedPassword = yield bcrypt_1.default.hash(Password, 10); //encriptar la contraseña
    try { //validar los datos para que no de error ... esto cuando la cedula sea igual en el caso real
        yield modeluser_1.User.create({
            Usuario: Usuario,
            Password: hashedPassword
        });
        res.json({
            msg: 'Usuario ' + Usuario + ' creado exitosamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "uups ocurrio un error al crear el usuario",
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Usuario, Password } = req.body;
    //validamos si el usurio existe 
    const user = yield modeluser_1.User.findOne({ where: { Usuario: Usuario } }); //despues del where se filtra por la columna de la base de datos
    if (!user) {
        return res.status(404).json({
            msg: 'el usuario ingresado no se encuentra de la base de datos'
        });
    }
    //validamos password
    const passwordValid = yield bcrypt_1.default.compare(Password, user.Password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: 'la contraseña es incorrecta'
        });
    }
    //generamos token 
    const token = jsonwebtoken_1.default.sign({
        Usuario: Usuario
    }, process.env.SECRET_KEY || 'kqrkD1!uTn)vl5dt$(M[ki(');
    res.json({ token });
});
exports.loginUser = loginUser;
