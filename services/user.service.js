<<<<<<< HEAD
import "../Model/model.js"
import mongoose from "mongoose";
=======
//import {users} from '../data/users.js'
import User from "../Model/model.js"
>>>>>>> 8f73bb5ff5b460b4937bc5220dc30b06170b36c5
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"



const generateAccessToken = (id, login) => {
    const payload ={
        id, login
    }
    return jsonwebtoken.sign(payload, 'secret', {expiresIn: '24h'})
}

class UserService {
<<<<<<< HEAD
    userModel = mongoose.model('User')
getAll = () => {
    return this.userModel.find()
}
getOne = (key) =>{
    return this.userModel.findById(key) 
}
register = (body) =>{
    // let salt = bcrypt.genSaltSync();
    // body.password = bcrypt.hashSync(body.password, salt);
    const user  = new this.userModel(body)
    return user.save()
}
login = async (body) =>{
    const user = await this.userModel.find({login: body.login})
    if(!user){
        return 'Такого пользователя не существует!'
    }
    const validPassword = await bcrypt.compare(body.password, user[0].password)
=======
getAll = () => {
    return User.findAll({attributes: ['id', 'login', 'email','photo']})
}
getOne = (key) =>{
    return User.findOne({attributes:{exclude:['password', 'createdAt', 'updatedAt']},where:{id: key}}) 
}
register = (body, file) =>{
    let salt = bcrypt.genSaltSync();
    body.password = bcrypt.hashSync(body.password, salt);
    return User.create({
        id: body.id,
        login: body.login,
        email: body.email,
        password: body.password,
        photo: file
    })
}
login = async (body) =>{
    const user = await User.findOne({where: {login: body.login}})
    if(!user){
        return 'Такого пользователя не существует!'
    }
    const validPassword = await bcrypt.compare(body.password, user.password)
>>>>>>> 8f73bb5ff5b460b4937bc5220dc30b06170b36c5
    if(!validPassword){
        return 'Invalid password'
    }else{
        const token = generateAccessToken(user.id, user.login)
        return token
    }
}

put = (body) =>{
    let salt = bcrypt.genSaltSync();
    body.password = bcrypt.hashSync(body.password, salt);
<<<<<<< HEAD
    return this.userModel.updateOne({login: body.login}, {$set: body})
}
delete = (body) =>{
    return this.userModel.deleteOne({login: body.login})
=======
    return User.update(body, {where:{login: body.login}})
}
delete = (body) =>{
    return User.destroy({where:{login: body.login}})
>>>>>>> 8f73bb5ff5b460b4937bc5220dc30b06170b36c5
}
}

let userService = new UserService()


export default userService 

