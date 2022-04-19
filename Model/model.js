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

