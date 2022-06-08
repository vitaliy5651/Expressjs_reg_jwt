import { Sequelize } from 'sequelize';

const sequelize = new Sequelize("users", "root", {
    dialect: "mysql",
    host: "localhost",
    define:{
        timestamps: false
    }

    
});

export default sequelize
