import { DataTypes } from "sequelize";
import sequelize from "../db/connection"
 export const modelusuarios = sequelize.define('usuarios', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Nombre:{
        type:DataTypes.STRING
    },
    Apellido:{
        type:DataTypes.STRING,
        allowNull:false
    },
    TipoCedula:{
        type:DataTypes.INTEGER
    },
    Cedula:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    Direccion:{
        type:DataTypes.STRING
    },
    Barrio:{
        type:DataTypes.STRING
    },
    Celular:{
        type:DataTypes.STRING,//tipo de dato // que no se repita
        allowNull:false // no nulos
    }
});