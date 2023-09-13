"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelusuarios = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.modelusuarios = connection_1.default.define('usuarios', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    Apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    TipoCedula: {
        type: sequelize_1.DataTypes.INTEGER
    },
    Cedula: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    Direccion: {
        type: sequelize_1.DataTypes.STRING
    },
    Barrio: {
        type: sequelize_1.DataTypes.STRING
    },
    Celular: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false // no nulos
    }
});
