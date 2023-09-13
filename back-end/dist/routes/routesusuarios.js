"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerusuarios_1 = require("../controllers/controllerusuarios");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, controllerusuarios_1.getUsuario); //entra a la ruta valida el token y luego me deja ingresar a los usuarios
exports.default = router;
