import sequelize from "../Connect/connect.js";
import { Sequelize } from "sequelize";

const User = sequelize.define("user", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true,
        unique: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    photo:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
    },
    updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
    },
});

export default User

