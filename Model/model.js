<<<<<<< HEAD
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userShema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        
    },
    email: String,
    password: {
        type: String,
        set: value => bcrypt.hashSync(value, bcrypt.genSaltSync())
    },
    // img:{
    //     fieldName: String,
    //     originalName: String,
    // }
},{versionKey: false})

export default mongoose.model('User', userShema)
=======
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
>>>>>>> 8f73bb5ff5b460b4937bc5220dc30b06170b36c5

