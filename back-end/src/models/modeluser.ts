import { DataTypes } from "sequelize";
import sequelize from "../db/connection"
 export const User = sequelize.define('user', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Usuario:{
        type:DataTypes.STRING
    },
    Password:{
        type:DataTypes.STRING
    }
});