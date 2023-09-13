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
const express_1 = __importDefault(require("express")); //importamos la dependncia express para ver los datos
const cors_1 = __importDefault(require("cors"));
//importamos las rutas
const routesusuarios_1 = __importDefault(require("../routes/routesusuarios"));
const user_1 = __importDefault(require("../routes/user"));
//rmportamos los modelos
const modelsusuarios_1 = require("./modelsusuarios");
const modeluser_1 = require("./modeluser");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('aplicacion corriendo en el puerto' + this.port);
        });
    }
    routes() {
        this.app.use('/api/usuarios', routesusuarios_1.default);
        this.app.use('/api/users', user_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        //cors esto es para enlazar los puertos diferentes
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield modelsusuarios_1.modelusuarios.sync();
                yield modeluser_1.User.sync();
            }
            catch (error) {
                console.error("database not connected", error);
            }
        });
    }
}
exports.default = Server;
