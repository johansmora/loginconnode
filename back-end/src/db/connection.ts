import { Sequelize } from "sequelize";


const sequelize = new Sequelize('ernesto','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;