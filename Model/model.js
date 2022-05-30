import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { string } from "joi";

const userShema = new mongoose.Schema({
    FirstName: {
        type: String,
    },
    LastName: {
        type: String,
    },
    login: {
        type: String,
    },
    email: String,
    password: {
        type: String,
        set: value => bcrypt.hashSync(value, bcrypt.genSaltSync())
    },
},{versionKey: false})

export default mongoose.model('User', userShema)

