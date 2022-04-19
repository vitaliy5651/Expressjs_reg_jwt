<<<<<<< HEAD
import mongoose from "mongoose";



const connect = mongoose.connect('mongodb://localhost:27017/DB',{useNewUrlParser: true});


export default connect
=======
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize("users", "root", "Vitosbarbos619", {
    dialect: "mysql",
    host: "localhost",
    define:{
        timestamps: false
    }
});

export default sequelize
>>>>>>> 8f73bb5ff5b460b4937bc5220dc30b06170b36c5
