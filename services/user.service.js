import "../Model/Usermodel.js"
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import tokensService from "./tokens.service.js";
import { UserDtos } from "../dtos/users.dtos.js";


class UserService {
    userModel = mongoose.model('User')
    tokenModel = mongoose.model('Token')
getAll = () => {
    return this.userModel.find()
}
getOne = async (Useremail) => {
const user = this.userModel.findOne({email: Useremail})
return user
}
getNewToken = async (refreshToken) => {
    if(!refreshToken){
        return 'Пользователь не авторизован'
    }
    const result = tokensService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokensService.findToken(refreshToken)
    if(!userData || !tokenFromDB){
        throw ApiError.UnauthorizedError()
    }
    const user = await this.userModel.findById(result.id)
    const userDtos = new UserDtos(user)
    const tokens = tokensService.generateTokens({...userDtos})
    await tokensService.saveToken(userDtos.id, tokens.refreshToken)
    return {...tokens,user}
}
register = async (body) =>{
    const user = await this.userModel.create(
        {
            FirstName: body.FirstName,
            LastName: body.LastName,
            login: body.login,
            email: body.email,
            password: body.password,
        })
        user.save()
        const userDtos = new UserDtos(user)
    const tokens = tokensService.generateTokens({...userDtos})
    await tokensService.saveToken(userDtos.id, tokens.refreshToken)
    return {...tokens,user}
}
login = async (body) =>{
    const user = await this.userModel.find({email: body.email})
    if (!user){
        return 'Такого пользователя не существует!'
    } else if(body.password !== user[0].password){
        return 'Invalid password'
    } else {
        const userDtos = new UserDtos(user)
        const tokens = tokensService.generateTokens({...userDtos})
        await tokensService.saveToken(userDtos.id, tokens.refreshToken)
        return {...tokens,user}
    }
}

put = (body) => {
    let salt = bcrypt.genSaltSync();
    body.password = bcrypt.hashSync(body.password, salt);
    return this.userModel.updateOne({id: body.id}, {$set: body})
}
delete = (body) =>{
    return this.userModel.deleteOne({login: body.login})
}
}

let userService = new UserService()


export default userService 

