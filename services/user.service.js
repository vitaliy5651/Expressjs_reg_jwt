import "../Model/model.js"
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"



const generateAccessToken = (id, login) => {
    const payload ={
        id, login
    }
    return jsonwebtoken.sign(payload, 'secret', {expiresIn: '24h'})
}

class UserService {
    userModel = mongoose.model('User')
getAll = () => {
    return this.userModel.find()
}
getOne = (key) =>{
    return this.userModel.findById(key) 
}
register = (body) =>{
    const user = new this.userModel(
        {
            FirstName: body.FirstName,
            LastName: body.LastName,
            login: body.login,
            email: body.email,
            password: body.password,
        })
    return user.save()
}
login = async (body) =>{
    const user = await this.userModel.find({id: body.id})
    if(!user){
        return 'Такого пользователя не существует!'
    }
    const validPassword = await bcrypt.compare(body.password, user[0].password)
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
    return this.userModel.updateOne({id: body.id}, {$set: body})
}
delete = (body) =>{
    return this.userModel.deleteOne({login: body.login})
}
}

let userService = new UserService()


export default userService 

