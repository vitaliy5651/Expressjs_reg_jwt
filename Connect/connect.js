import { Sequelize } from 'sequelize';

const sequelize = new Sequelize("users", "root", "Vitosbarbos619", {
    dialect: "mysql",
    host: "localhost",
    define:{
        timestamps: false
    }
});

export default sequelize
